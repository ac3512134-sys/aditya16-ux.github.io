let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const input = document.getElementById("taskInput");
  const time = parseInt(document.getElementById("timeInput").value);

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    duration: time * 60,
    remaining: time * 60,
    done: false
  });

  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const minutes = Math.floor(task.remaining / 60);
    const seconds = task.remaining % 60;

    li.innerHTML = `
      <span>${task.text} (${minutes}:${seconds
        .toString()
        .padStart(2, "0")})</span>
      <button onclick="startTask(${index})">▶</button>
      <button onclick="removeTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTotalTime();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

let currentInterval = null;

function startTask(index) {
  if (currentInterval) clearInterval(currentInterval);

  currentInterval = setInterval(() => {
    if (tasks[index].remaining > 0) {
      tasks[index].remaining--;
      renderTasks();
    } else {
      clearInterval(currentInterval);
      alert(
        "Successful people are not gifted; they just work hard, then succeed on purpose"
      );
      tasks[index].done = true;
      renderTasks();
    }
  }, 1000);
}

function updateTotalTime() {
  const total = tasks.reduce((sum, task) => sum + task.remaining, 0);

  const minutes = Math.floor(total / 60);

  document.getElementById(
    "totalTime"
  ).innerText = "Total Focus Time: " + minutes + " min";
}

renderTasks();
