// Handle the user clicking the browser action button
chrome.browserAction.onClicked.addListener(function (tab) {
    // Open the search bar
    chrome.tabs.sendMessage(tab.id, { action: "openSearchBar" });
  });
  
  // Handle the user submitting the search form
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "searchForWords") {
      // Send the search query to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "searchForWords", query: request.query });
      });
    }
  });
  