chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-title",
    title: "Copy Link Title",
    contexts: ["link"], // Ensures this only appears for links
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy-title") {
    // Access the link's title attribute
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyLinkTitle,
      args: [info.linkUrl],
    });
  }
});

function copyLinkTitle(linkUrl) {
  const links = Array.from(document.querySelectorAll('a[href]'));
  const targetLink = links.find((link) => link.href === linkUrl);

  if (targetLink && targetLink.title) {
    navigator.clipboard.writeText(targetLink.title).then(() => {
      console.log("Title copied to clipboard:", targetLink.title);
    });
  } else {
    console.error("No title found for the link.");
  }
}
