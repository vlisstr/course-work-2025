chrome.webNavigation.onBeforeNavigate.addListener(details => {
  chrome.storage.local.get(["blockedSites"], res => {
    const list = res.blockedSites || ["youtube.com", "instagram.com"];
    if (list.some(site => details.url.includes(site))) {
      chrome.tabs.update(details.tabId, { url: "about:blank" });
    }
  });
});
