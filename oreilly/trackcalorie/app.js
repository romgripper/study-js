// Item Controller
const ItemCtrl = (function () {
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };
    const data = {
        items: [],
        currentItem: null
    };
    return {
        getItems: () => data.items,
        setItems: (items) => (data.items = items),
        getItemById: (id) => data.items.find((item) => item.id === id),
        addItem: (name, calories) => {
            let id;
            if (data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }
            calories = parseInt(calories);
            newItem = new Item(id, name, calories);
            data.items.push(newItem);
            return newItem;
        },
        updateItem: (item) => {
            const currentItem = ItemCtrl.getItemById(data.currentItem.id);
            currentItem.name = item.name ? item.name : currentItem.name;
            currentItem.calories = item.calories ? parseInt(item.calories) : currentItem.calories;
        },
        deleteItem: () => {
            data.items.splice(data.items.indexOf(data.currentItem), 1);
        },
        clearAllItems: () => {
            data.items = [];
            data.currentItem = null;
        },
        getCurrentItem: () => data.currentItem,
        setCurrentItem: (item) => (data.currentItem = item),
        getTotalCalories: () => data.items.map((i) => i.calories).reduce((s, v) => s + v, 0),
        logData: () => data
    };
})();

const UICtrl = (function () {
    const UISelectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        clearBtn: ".clear-btn",
        itemNameInput: "#item-name",
        itemCalorieInput: "#item-calories",
        totalCalories: ".total-calories"
    };
    return {
        populateItemList: (items) => {
            let html = "";
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-cotent  pull-right">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>
            `;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: () => ({
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCalorieInput).value
        }),
        showTotalCalories: (calories) => {
            document.querySelector(UISelectors.totalCalories).textContent = calories;
        },
        showEditState: () => {
            console.log("showEditState");
            document.querySelector(UISelectors.updateBtn).style.display = "inline";
            document.querySelector(UISelectors.deleteBtn).style.display = "inline";
            document.querySelector(UISelectors.backBtn).style.display = "inline";
            document.querySelector(UISelectors.addBtn).style.display = "none";
        },
        clearEditState: () => {
            console.log("clearEditState");
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addBtn).style.display = "inline";
        },
        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalorieInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        getSelectors: () => UISelectors
    };
})();

const StorageCtrl = (function () {
    return {
        storeItems: (items) => {
            localStorage.setItem("items", JSON.stringify(items));
        },
        loadItems: () => {
            const itemsJson = localStorage.getItem("items");
            return itemsJson ? JSON.parse(itemsJson) : [];
        }
    };
})();

const App = (function (itemCtrl, uiCtrl, storageCtrl) {
    const update = () => {
        const items = itemCtrl.getItems();
        storageCtrl.storeItems(items);
        uiCtrl.populateItemList(items);
        const totalCalories = itemCtrl.getTotalCalories();
        uiCtrl.showTotalCalories(totalCalories);
    };
    const itemAddSubmit = (e) => {
        const input = uiCtrl.getItemInput();
        if (input.name && input.calories) {
            itemCtrl.addItem(input.name, input.calories);
            update();
        }
        e.preventDefault();
    };
    const itemEditSubmit = (e) => {
        if (e.target.classList.contains("edit-item")) {
            const listId = e.target.parentNode.parentNode.id;
            const itemId = parseInt(listId.split("-")[1]);
            const currentItem = itemCtrl.getItemById(itemId);
            itemCtrl.setCurrentItem(currentItem);
            uiCtrl.addItemToForm();
        }
        e.preventDefault();
    };
    const itemUpdateSubmit = (e) => {
        const input = uiCtrl.getItemInput();
        itemCtrl.updateItem(input);
        uiCtrl.clearEditState();
        update();
        e.preventDefault();
    };
    const itemDeleteSubmit = (e) => {
        itemCtrl.deleteItem();
        uiCtrl.clearEditState();
        update();
        e.preventDefault();
    };
    const clearAllSubmit = (e) => {
        itemCtrl.clearAllItems();
        uiCtrl.clearEditState();
        update();
        e.preventDefault();
    };
    const loadEventListeners = () => {
        const UISelectors = uiCtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
        document.addEventListener("keypress", (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);
        document.querySelector(UISelectors.backBtn).addEventListener("click", uiCtrl.clearEditState);
        document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllSubmit);
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditSubmit);
    };
    return {
        init: function () {
            console.log("Initializing App...");
            uiCtrl.clearEditState();
            itemCtrl.setItems(storageCtrl.loadItems());
            update();
            loadEventListeners();
        }
    };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
