// Виводимо випадкову цитату для мотивації 
const quotes = [
  "Ти можеш більше, ніж думаєш!",
  "Не відволікайся, зроби хоча б трохи!",
  "Кожен цикл — це плюс до цілі",
  "Працюй і не забудь про перерву :)"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quote").innerText = randomQuote;

let time = 25 * 60;
let timer;

document.getElementById("start").onclick = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `${m}:${s}`;

    if (time === 0) {
      clearInterval(timer);
      saveSession(); // додаємо цикл Pomodoro (25 хв) до лічильника продуктивності за сьогодні
    }
  }, 1000);
};

function saveSession() {
  const key = new Date().toLocaleDateString("uk-UA");
  chrome.storage.local.get(["stats"], (result) => {
    const stats = result.stats || {};
    stats[key] = (stats[key] || 0) + 1;
    chrome.storage.local.set({ stats });
  });
}

const input = document.getElementById("new-task");
const list = document.getElementById("task-list");

document.getElementById("add-task").onclick = () => {
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;
  list.appendChild(li);
  input.value = "";

  chrome.storage.local.get(["tasks"], res => {
    const tasks = res.tasks || [];
    tasks.push(task);
    chrome.storage.local.set({ tasks });
  });
};

chrome.storage.local.get(["tasks"], res => {
  (res.tasks || []).forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
  });
});