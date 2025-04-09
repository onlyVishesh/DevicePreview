// Browser extension popup
document.addEventListener("DOMContentLoaded", function () {
  const openViewerBtn = document.createElement("button");
  openViewerBtn.textContent = "Open Device Preview";
  openViewerBtn.style.cssText = `
        width: 100%;
        padding: 10px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 10px;
    `;

  openViewerBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;

      // Open the device preview in a new tab
      chrome.tabs.create({
        url:
          chrome.runtime.getURL("index.html") +
          "?url=" +
          encodeURIComponent(currentUrl),
      });

      window.close();
    });
  });

  document.getElementById("popup-root").appendChild(openViewerBtn);
});
