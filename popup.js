document.getElementById("toggle").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            window.postMessage({ type: "TOGGLE_ELEMENT" }, "*");
        },
    });
});
