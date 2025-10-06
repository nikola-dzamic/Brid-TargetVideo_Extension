bplrPlayerInfo.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: bplrInjectScript,
  });
});

clearBplrLocalStorage.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: bplrClear,
  });

});

function bplrInjectScript() {
  var s = document.createElement("script");
  s.src = chrome.runtime.getURL("js/info.js");
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

function bplrClear() {
  localStorage.clear();
}


playerInfoEmbed.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      var s = document.createElement("script");
      s.src = chrome.runtime.getURL("js/playerInfoEmbed.js");
      s.onload = function () {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(s);
      
      var c = document.createElement("link");
      c.rel = "stylesheet";
      c.href = chrome.runtime.getURL("css/page-style.css");
      
      (document.head || document.documentElement).appendChild(c);
    },
  });
});

enableDebug.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      var s = document.createElement("script");
      s.src = chrome.runtime.getURL("js/enableDebug.js");
      s.onload = function () {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(s);
    },
  });
});