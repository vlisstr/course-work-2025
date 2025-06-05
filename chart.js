chrome.storage.local.get(["stats"], res => {
  const stats = res.stats || {};
  const labels = Object.keys(stats);
  const data = Object.values(stats);

  new Chart(document.getElementById("chart"), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Pomodoro-сесії (по днях)',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Кількість сесій'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Дата'
          }
        }
      }
    }
  });
});
