const CLASS_DELETE_ITEM = "delete-item";
const TASKS_STORAGE_KEY = "tasks";

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

function loadEventListerners() {
  document.addEventListener("DOMContentLoaded", loadTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

loadEventListerners();

function addTaskOnPage(task) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));

  const link = document.createElement("a");
  link.className = `${CLASS_DELETE_ITEM} secondary-content`;
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
}

function addTask(e) {
  const task = taskInput.value;
  if (task.trim() == "") return;
  addTaskOnPage(task);
  saveTask(task);
  taskList.value = "";

  e.preventDefault();
}

function removeTask(e) {
  const parent = e.target.parentElement;
  if (parent.classList.contains(CLASS_DELETE_ITEM)) {
    const li = parent.parentElement;
    if (confirm(`Are you true to remove task "${li.textContent}"?`)) {
      li.remove();
      const tasks = readTasks();
      tasks.forEach((task, index) => {
        if (task === li.textContent) {
          tasks.splice(index, 1);
          writeTasks(tasks);
        }
      });
    }
  }
  e.preventDefault();
}

function clearTasks() {
  if (taskList.firstChild && confirm(`Are you true to clear all task(s)?`)) {
    while (taskList.firstChild) taskList.firstChild.remove();
    //Array.from(taskList.children).forEach((li) => li.remove());
    localStorage.clear(TASKS_STORAGE_KEY);
  }
}

function filterTasks() {
  const text = filter.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().includes(text)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function readTasks() {
  let tasks;
  const tasksStringSaved = localStorage.getItem(TASKS_STORAGE_KEY);
  if (tasksStringSaved) {
    tasks = JSON.parse(tasksStringSaved);
  } else {
    tasks = [];
  }
  return tasks;
}

function saveTask(task) {
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
}

function writeTasks(tasks) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = readTasks();
  tasks.forEach((task) => addTaskOnPage(task));
}
