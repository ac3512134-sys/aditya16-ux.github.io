let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const input = document.getElementById("taskInput");
  const time = parseInt(document.getElementById("timeInput").value);

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    duration: time * 60,     // total seconds
    remaining: time * 60,    // countdown seconds
    running: false,
    onBreak: false,
    done: false
  });

  input.value = "";
  renderTasks();
}

let activeIndex = null;
let interval;

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " completed" : "");

    const minutes = Math.floor(task.remaining / 60);
    const seconds = task.remaining % 60;
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <div style="font-size:14px; color:#9ca3af;">
          ${task.onBreak ? "☕ Break" : "⏱ Focus"} — ${timeDisplay}
        </div>
      </div>

      <div style="display:flex; gap:8px;">
        ${!task.done ? `
          <button onclick="startTask(${index})">▶</button>
          <button onclick="pauseTask()">⏸</button>
          <button onclick="resetTask(${index})">🔁</button>
        ` : ""}

        ${task.done && !task.onBreak ? `
          <button onclick="startBreak(${index})">☕ Break</button>
        ` : ""}

        <button onclick="removeTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });


 localStorage.setItem("tasks", JSON.stringify(tasks));
updateTotalTime();
}



function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();

  activeIndex = index;

  // 🔹 Sync timer with task time
  if (tasks[index].remaining <= 0 || tasks[index].remaining > tasks[index].duration) {
    tasks[index].remaining = tasks[index].duration;
  }

  clearInterval(interval);
  interval = setInterval(() => {
    if (tasks[index].remaining > 0) {
      tasks[index].remaining--;
      renderTasks();
    } else {
      clearInterval(interval);
      tasks[index].done = true;
      activeIndex = null;

      alert(
        "Successful people are not gifted; they just work hard, then succeed on purpose."
      );

      renderTasks();
    }
  }, 1000);
}


function pauseTask() {
  clearInterval(interval);
  activeIndex = null;
}

function resetTask(index) {
  clearInterval(interval);
  tasks[index].remaining = tasks[index].duration;
  tasks[index].running = false;
  activeIndex = null;
  renderTasks();
}

function startBreak(index) {
  clearInterval(interval);
  activeIndex = index;

  tasks[index].onBreak = true;
  tasks[index].remaining = 8 * 60;

  interval = setInterval(() => {
    if (tasks[index].remaining > 0) {
      tasks[index].remaining--;
      renderTasks();
    } else {
      clearInterval(interval);
      tasks[index].onBreak = false;
      tasks[index].remaining = tasks[index].duration;
      activeIndex = null;

      alert("Break over. Back to work.");
      renderTasks();
    }
  }, 1000);
}
function updateTotalTime() {
  const totalSeconds = tasks
    .filter(task => !task.done)
    .reduce((sum, task) => sum + task.duration, 0);

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  document.getElementById("totalTime").textContent =
    hours > 0
      ? `Total Focus Time: ${hours}h ${minutes}m`
      : `Total Focus Time: ${totalMinutes} min`;
}
