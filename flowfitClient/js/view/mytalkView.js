export class ChatView {
    constructor() {
        this.container = document.querySelector('main');
    }

    render() {
        this.container.innerHTML = `
            <!-- Header -->
            <header class="mypage-header">
                <h1 class="app-logo">CORPO CULTO</h1>
                <div class="menu-icon" id="menu-toggle">&#9776;</div>
            </header>

            <!-- Conteúdo Principal -->
            <section class="chat-container">
                <div class="role-selection">
                    <button id="personal-trainer" class="role-btn">Personal Trainer</button>
                    <button id="nutritionist" class="role-btn">Nutricionista</button>
                </div>
                <div id="chat-window" class="chat-window"></div>
                <div class="message-input-container">
                    <input type="text" id="message-input" placeholder="Digite sua mensagem...">
                    <button id="send-message-btn">Enviar</button>
                </div>
            </section>

            <!-- Menu Overlay -->
            <div class="menu-overlay" id="menu-overlay">
                <nav class="menu-nav">
                    <a href="/mypage" class="menu-item">Home</a>
                    <a href="/qrcode" class="menu-item">CheckIn</a>
                    <a href="/mytraining" class="menu-item">Dicas de Treino</a>
                    <a href="/mynutrition" class="menu-item">Dicas de Nutrição</a>
                    <a href="/mytalk" class="menu-item">Chat Bot</a>
                </nav>
                <div class="menu-footer">
                    <button id="logout-btn" class="menu-logout">Logout</button>
                </div>
            </div>

            <!-- Footer -->
            <footer class="mypage-footer">
                <nav>
                    <a href="/mypage" class="footer-icon"><i class="fas fa-home"></i></a>
                    <a href="/qrcode" class="footer-icon"><i class="fas fa-qrcode"></i></a>
                    <a href="/mytraining" class="footer-icon"><i class="fas fa-trophy"></i></a>
                    <a href="/mytalk" class="footer-icon active"><i class="fas fa-comments"></i></a>
                </nav>
            </footer>
        `;

        this.updateFooterActiveIcon();
        this.addMenuEventHandlers();
    }

    addMenuEventHandlers() {
        const menuToggle = document.getElementById('menu-toggle');
        const menuOverlay = document.getElementById('menu-overlay');
        const logoutBtn = document.getElementById('logout-btn');

        if (menuToggle && menuOverlay) {
            menuToggle.addEventListener('click', () => {
                menuOverlay.classList.toggle('active');
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.clear();
                window.location.href = '/';
            });
        }
    }

    bindRoleSelection(callback) {
        document.getElementById('personal-trainer').addEventListener('click', () => callback('personal_trainer'));
        document.getElementById('nutritionist').addEventListener('click', () => callback('nutritionist'));
    }

    bindSendMessage(callback) {
        const input = document.getElementById('message-input');
        const button = document.getElementById('send-message-btn');
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                callback(message);
                input.value = ''; // Limpa o campo de entrada
            }
        };
        button.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') sendMessage();
        });
    }

    addMessage(sender, message) {
        const chatWindow = document.getElementById('chat-window');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Rola para a última mensagem
    }

    setActiveRole(role) {
        document.querySelectorAll('.role-btn').forEach((button) => button.classList.remove('active'));
        document.getElementById(role === 'personal_trainer' ? 'personal-trainer' : 'nutritionist').classList.add('active');
    }

    updateFooterActiveIcon() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.footer-icon').forEach((icon) => {
            if (icon.getAttribute('href') === currentPath) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }
}
