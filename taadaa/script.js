var taskTitle = document.getElementById("task-title");
var taskDescription = document.getElementById("task-description");
var submitBtn = document.getElementById("submit-btn");
var editBtn = document.getElementById("edit-btn");

var taskList = JSON.parse(localStorage.getItem("tasksList")) || [];

console.log(typeof taskList);
console.log(taskList);

if (taskList.length > 0) {
  displayTasks();
}

function addTask() {
  var title = taskTitle.value.trim();
  var description = taskDescription.value.trim();

  var task = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
  };

  taskList.push(task);
  displayTasks();
  clearFields();
}

function displayTasks() {
  var cartona = "";
  var completeContainer = "";
  const tasks = taskList.filter((task) => task.completed == false);
  const completedTasks = taskList.filter((task) => task.completed == true);
  const completeHeader = document.getElementById("completed-header");

  completedTasks.length > 0
    ? completeHeader.classList.replace("d-none", "d-block")
    : completeHeader.classList.replace("d-block", "d-none");

  for (var i = 0; i < tasks.length; i++) {
    cartona += `
                 <li class="d-flex align-items-center justify-content-between px-3">
                  <div class="d-flex align-items-center gap-3">
                    <span>
                      <span class="d-block fs-4 mb-0 task-title">${tasks[i].title}</span>
                      <span class="d-block fs-5 text-black-50 task-description">${tasks[i].description}</span>
                    </span>
                  </div>

                  <div>
                    <button class="btn text-danger px-1 fs-5" onclick="deleteTask(${tasks[i].id})"><i class="fa-regular fa-trash-can"></i></button>
                    <button class="btn text-primary px-1 fs-5" onclick="editTask(${tasks[i].id})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn text-success px-1 fs-5" onclick="completeTask(${tasks[i].id})"><i class="fa-regular fa-circle-check"></i></button>
                  </div>
                </li>
        `;
  }

  for (var i = 0; i < completedTasks.length; i++) {
    completeContainer += `
                 <li class="d-flex align-items-center justify-content-between px-3">
                  <div class="d-flex align-items-center gap-3">
                    <span>
                      <span class="d-block fs-4 mb-0 task-title">${completedTasks[i].title}</span>
                      <span class="d-block fs-5 text-black-50 task-description">${completedTasks[i].description}</span>
                    </span>
                  </div>

                  <div>
                    <button class="btn text-danger px-1 fs-5" onclick="deleteTask(${completedTasks[i].id})"><i class="fa-regular fa-trash-can"></i></button>
                  </div>
                </li>
        `;
  }

  document.getElementById("task-container").innerHTML = cartona;
  document.getElementById("completed-container").innerHTML = completeContainer;

  localStorage.setItem("tasksList", JSON.stringify(taskList));
}

function deleteTask(id) {
  taskList = taskList.filter((t) => t.id !== id);
  displayTasks();
}

function clearFields() {
  taskTitle.value = "";
  taskDescription.value = "";
}

function editTask(id) {
  submitBtn.classList.add("d-none");
  editBtn.classList.replace("d-none", "d-block");

  const task = taskList.find((t) => t.id === id);

  taskTitle.value = task.title;
  taskDescription.value = task.description;

  editBtn.addEventListener("click", () => {
    task.title = taskTitle.value.trim();
    task.description = taskDescription.value.trim();
    displayTasks();
    clearFields();
    submitBtn.classList.replace("d-none", "d-block");
    editBtn.classList.replace("d-block", "d-none");
  });
}

function completeTask(id) {
  taskList = taskList.map((t) => (t.id === id ? { ...t, completed: true } : t));
  displayTasks();
}
