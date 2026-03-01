const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");
const progress = document.getElementById("progress");

function updateProgress() {
  const total = taskList.children.length;
  const completed = document.querySelectorAll(".completed").length;
  progress.textContent = `${completed} of ${total} completed`;
  emptyMsg.style.display = total === 0 ? "block" : "none";
}

function addTask() {
  if (taskInput.value === "") return;

  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const taskText = document.createElement("span");
  taskText.textContent = taskInput.value;

  const meta = document.createElement("small");
  meta.innerHTML = `
    <span class="priority ${priorityInput.value}">
      ${priorityInput.value} priority
    </span>
    ${taskTime.value ? " • " + taskTime.value : ""}
  `;

  infoDiv.appendChild(taskText);
  infoDiv.appendChild(meta);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "task-actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateProgress();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏";
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", taskText.textContent);
    if (newTask) taskText.textContent = newTask;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => {
    li.remove();
    updateProgress();
  };

  actionsDiv.appendChild(completeBtn);
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(infoDiv);
  li.appendChild(actionsDiv);
  taskList.appendChild(li);

  taskInput.value = "";
  taskTime.value = "";
  updateProgress();
}

