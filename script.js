let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const time = parseInt(document.getElementById("timeInput").value);

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    duration: time,
    done: false
  });

  input.value = "";
  saveAndRender();
}

// Toggle complete
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

// Remove task
function removeTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Save + render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let total = 0;

  tasks.forEach((task, index) => {
    if (!task.done) total += task.duration;

    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})">
      ${task.text} (${task.duration} min)
      <button onclick="removeTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("totalTime").innerText =
    "Total Focus Time: " + total + " min";
}

// Run on load
renderTasks();
