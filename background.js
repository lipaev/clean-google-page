chrome.runtime.onMessage.addListener((message, sender) => {
    chrome.scripting.insertCSS({
        "files": ["styles.css"],
        "target": {
            "tabId": sender.tab.id,
            "frameIds": [0]
        }
    })
    console.log("Injected")
})