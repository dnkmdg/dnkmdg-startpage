chrome.commands.onCommand.addListener(function (command) {
    const params = { 
        active: true,
        currentWindow: true 
    }
    
    if(command === 'go-to-bookmark'){
        chrome.tabs.query(params, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'go-to-bookmark' })
        })
    }
})