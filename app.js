//define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Laod all event listeners
loadEventListeners();

function loadEventListeners() {
  //Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTask);
  //filter task event
  filter.addEventListener("keyup", filterTask);
}

//Get Task from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create list elements
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class to link
    link.className = "delete-item secondary-content";
    //add icon htm
    link.innerHTML = '<i class="fa  fa-remove"></i>';
    //append link to list
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

//Add TAsk
function addTask(event) {
  if (taskInput.value === "") {
    alert("add a task");
  }
  //create list elements
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class to link
  link.className = "delete-item secondary-content";
  //add icon htm
  link.innerHTML = '<i class="fa  fa-remove"></i>';
  //append link to list
  li.appendChild(link);

  //append li to ul
  if (taskInput.value !== "") {
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
  } else {
    alert("add valid task");
  }

  //clear input
  taskInput.value = "";

  event.preventDefault();
}

//store task in Local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

//clear task
function clearTask() {
  //first approach
  // taskList.innerHTML = "";

  //second approach and faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();
}

//clear task from local storage
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//filter task
function filterTask(event) {
  const text = event.target.value.toLowerCase().trim();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
