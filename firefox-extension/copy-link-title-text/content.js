browser.runtime.onMessage.addListener((message) => {
  if (message.action === "copyTitle" && message.linkUrl) {
    // Find the link element with the matching URL
    const links = document.querySelectorAll('a');
    for (const link of links) {
      if (link.href === message.linkUrl) {
        const title = link.getAttribute('title');
        if (title) {
          // Copy the title to the clipboard
          navigator.clipboard.writeText(title).then(
            () => console.log("Title copied to clipboard:", title),
            (err) => console.error("Failed to copy title:", err)
          );
        } else {
          console.error("No title attribute found for the link.");
        }
        break;
      }
    }
  }
});
