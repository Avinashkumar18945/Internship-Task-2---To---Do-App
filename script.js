const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    if (task.completed) {
      span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔️";

    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {

  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
};

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

renderTasks();