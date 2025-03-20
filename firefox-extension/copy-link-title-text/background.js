// Create a context menu item for <a> tags
browser.contextMenus.create({
  id: "copy-link-title",
  title: "Copy Title",
  contexts: ["link"]
});

// Listener for menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-link-title") {
    // Send a message to the content script to fetch the title
    browser.tabs.sendMessage(tab.id, {
      action: "copyTitle",
      linkUrl: info.linkUrl
    });
  }
});
