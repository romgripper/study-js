class UI {
    constructor() {
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.bodyInput = document.querySelector("#body");
        this.idInput = document.querySelector("#id");
        this.postSumbit = document.querySelector(".post-submit");
        this.forState = "add";
    }

    showPosts(posts) {
        let output = "";
        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `;
        });
        this.post.innerHTML = output;
    }

    fillForm(post) {
        this.idInput.value = post.id;
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;

        this.changeFormState("edit");
    }

    changeFormState(state) {
        if (state === "edit") {
            this.postSumbit.textContent = "Update Post";
            this.postSumbit.classList.replace("btn-primary", "btn-warning");

            const cancelButton = document.createElement("button");
            cancelButton.className = "post-cancel btn btn-light btn-block";
            cancelButton.textContent = "Cancel Edit";

            const cardForm = document.querySelector(".card-form");
            cardForm.append(cancelButton);
        } else {
            this.postSumbit.textContent = "Post It";
            this.postSumbit.classList.replace("btn-warning", "btn-primary");
            if (document.querySelector(".post-cancel")) {
                document.querySelector(".post-cancel").remove();
            }
            this.clearFields();
        }
    }

    showAlert(message, className) {
        this.clearAlert();
        const div = document.createElement("div");
        div.className = className;
        div.textContent = message;
        const container = document.querySelector(".postsContainer");
        const posts = document.querySelector("#posts");
        container.insertBefore(div, posts);
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert");
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
        this.idInput.value = "";
    }
}

export const ui = new UI();
