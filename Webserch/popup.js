// Get the search input field and search button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Add a click event listener to the search button
searchButton.addEventListener("click", function () {
  // Get the word to search for
  const wordToSearch = searchInput.value.toLowerCase();

  // Send a message to the content script to search for the word
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "search", word: wordToSearch });
  });
});
