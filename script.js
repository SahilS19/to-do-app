function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">✕</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
}

function deleteTask(button) {
  const li = button.parentElement;
  li.style.transform = "translateX(100%)";
  li.style.opacity = "0";
  setTimeout(() => li.remove(), 300);
}

function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
}

function downloadTasks() {
  const tasks = document.querySelectorAll("#taskList li span");
  let text = "To-Do List:\n\n";
  tasks.forEach((task, index) => {
    const isDone = task.parentElement.classList.contains("completed");
    text += `• ${task.textContent} ${isDone ? "(completed)" : ""}\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "todo-list.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
