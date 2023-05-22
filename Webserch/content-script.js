// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openSearchBar") {
    // Open the search bar
    const searchBarHtml = `
      <div style="position: fixed; top: 10px; left: 10px; z-index: 9999;">
        <form id="searchForm">
          <input type="text" name="query" placeholder="Search for words...">
          <input type="submit" value="Search">
          <button type="button" id="cancelButton">Cancel</button>
        </form>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", searchBarHtml);

    // Handle the user submitting the search form
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const query = event.target.elements.query.value.toLowerCase();
      chrome.runtime.sendMessage({ action: "searchForWords", query: query });
    });

    // Handle the user clicking the cancel button
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener("click", function () {
      document.getElementById("searchForm").remove();
    });
  } else if (request.action === "searchForWords") {
    // Define the words to search for
    const wordsToSearch = request.query.split(/\s+/);

    // Get all text nodes on the page
const textNodes = document.evaluate(
  "//text()[not(parent::script) and not(parent::style) and not(parent::textarea)]",
  document.body,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null
);

// Loop through the text nodes and highlight any words that match the search query
for (let i = 0; i < textNodes.snapshotLength; i++) {
  const textNode = textNodes.snapshotItem(i);
  const text = textNode.textContent.toLowerCase();

  for (const word of wordsToSearch) {
    if (text.includes(word)) {
      const newNode = document.createElement("span");
      newNode.style.backgroundColor = "yellow";
      newNode.textContent = textNode.textContent;
      textNode.parentNode.replaceChild(newNode, textNode);
      break;
    }
  }
}
  }
});

