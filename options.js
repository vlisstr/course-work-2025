const inputEl = document.getElementById("site-input");
const listEl = document.getElementById("site-list");
const addBtn = document.getElementById("add-site");

addBtn.onclick = () => {
  const site = inputEl.value.trim();
  if (!site) return;

  chrome.storage.local.get(["blockedSites"], res => {
    const sites = res.blockedSites || [];
    sites.push(site);
    chrome.storage.local.set({ blockedSites: sites }, renderList);
  });
  inputEl.value = "";
};

function renderList() {
  chrome.storage.local.get(["blockedSites"], res => {
    listEl.innerHTML = "";
    (res.blockedSites || []).forEach(site => {
      const li = document.createElement("li");
      li.textContent = site;
      listEl.appendChild(li);
    });
  });
}

renderList();
