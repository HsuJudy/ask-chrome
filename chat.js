alert("Hello from chat.js");

const systemPrompt="You are a helpful assistant answers questions based this context. {webpage_content}";

// chrome.storage.local.set({ chat_history: [] });
// const apiKey = "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"

// const chat_history = [
//     { role: "system", content: systemPrompt }
// ]

document.getElementById('toggle-chat').addEventListener('click', () => {
    const chatContainer = document.getElementById('chatContainer');
    // chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
    

    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }

    const toggleButton = document.getElementById('toggle-chat');
    toggleButton.style.display= 'flex';
});

function addMessage(className, message) {
    const chatContent = document.getElementById('chatContent');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}


document.getElementById('askButton').addEventListener('click', async () => {
    const question = document.getElementById('questionInput').value;
    if (question.trim() === '') return;
    addMessage('user-message', question);
    // chat_history.push({ role: "human", content: question });
    const content = document.body.innerText;
    // chat_history.push({ role: "web_content", content: content });

    // create a prompt for the llm including the question and the content
    // const response = await fetch('https://ec2.judyhsu.com', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "question": question,
    //         "content": content,
    //     })
    // });
    fetch('https://ec2.judyhsu.com/', {
                
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
    }).catch((error) => {
        addMessage('Error:', error);
    });
    
    
    // chat_history.push({ role: "assisstant", content: response.choices[0].message.content });

    // addMessage('bot-message', response.answer);

    document.getElementById('questionInput').value = '';
});



