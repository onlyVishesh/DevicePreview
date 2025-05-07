// Bookmark utility functions
export const addToBookmarks = (
  url,
  title = "DevicePreview - Test Your Responsive Design"
) => {
  try {
    // Check if the browser supports the bookmark API
    if (window.external && "AddFavorite" in window.external) {
      // Internet Explorer
      window.external.AddFavorite(url, title);
    } else if (window.sidebar && window.sidebar.addPanel) {
      // Firefox
      window.sidebar.addPanel(title, url, "");
    } else if (window.opera && window.print) {
      // Opera
      const elem = document.createElement("a");
      elem.setAttribute("href", url);
      elem.setAttribute("title", title);
      elem.setAttribute("rel", "sidebar");
      elem.click();
    } else {
      // For modern browsers, show instructions
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const shortcut = isMac ? "Cmd+D" : "Ctrl+D";

      // Create a custom modal-like notification
      const notification = document.createElement("div");
      notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      `;

      notification.innerHTML = `
        <div style="margin-bottom: 15px; font-size: 18px; font-weight: 600; color: #1f2937;">
          📌 Add to Bookmarks
        </div>
        <div style="margin-bottom: 15px; color: #6b7280; line-height: 1.5;">
          Press <strong style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; color: #1f2937;">${shortcut}</strong> to bookmark this page
        </div>
        <button id="bookmark-close" style="
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        ">Got it!</button>
      `;

      document.body.appendChild(notification);

      // Add overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
      `;
      document.body.appendChild(overlay);

      // Close functionality
      const closeBtn = notification.querySelector("#bookmark-close");
      const close = () => {
        document.body.removeChild(notification);
        document.body.removeChild(overlay);
      };

      closeBtn.onclick = close;
      overlay.onclick = close;

      // Auto close after 5 seconds
      setTimeout(close, 5000);

      return true;
    }
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
};

export const getCurrentPageBookmarkData = () => {
  return {
    url: window.location.href,
    title: document.title || "DevicePreview - Test Your Responsive Design",
  };
};
