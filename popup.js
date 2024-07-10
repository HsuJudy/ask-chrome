var content;

document.getElementById('toggle-chat').addEventListener('click', () => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
});

document.getElementById('askButton').addEventListener('click', () => {
    const question = document.getElementById('questionInput').value;
    if (question.trim() === '') return;

    addMessage('user-message', question);

    fetch('http://3.138.154.43', {
                
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            question: question,
            // get content from loadContent's response variable
            content: content
        })
    })
    .then(res => res.json())
    .then(data => {
        addMessage('bot-message', data.answer);
    });

    document.getElementById('questionInput').value = '';
});

function addMessage(className, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function helperGetContent() {
    return document.body.innerText;
}

async function loadContent(){
    let tabs = await chrome.tabs.query({active: true, currentWindow: true});
    var activeTab = tabs[0];
    var activeTabId = activeTab.id;
        
    let results = await chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
        func: helperGetContent,
    })
    content = results;
    console.log(content)
    

}

window.onload = loadContent;
