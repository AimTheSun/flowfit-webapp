export default class NormalView {
    constructor() {
        this.chatContainer = document.getElementById('chat-container');
    }

    render() {
        this.chatContainer.innerHTML = '<h2>Normal Mode</h2><p>The assistant is in a neutral mood.</p>';
        this.chatContainer.style.backgroundColor = '#e6ffe6'; // Light green background
        this.chatContainer.style.borderColor = '#00ff00'; // Green border
    }

    addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'assistant-message';
        messageElement.textContent = message;
        messageElement.style.color = '#006600'; // Dark green text for normal mode
        this.chatContainer.appendChild(messageElement);
    }
}