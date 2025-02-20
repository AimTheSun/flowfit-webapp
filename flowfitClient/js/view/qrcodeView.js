export const qrcodeView = {
    render(qrCodeUrl, dynamicUrl, status) {
        const main = document.querySelector('main');

        // Esconde os botões de login e registo
        document.querySelector('header').style.display = 'none';
        const btnContainer = document.querySelector('.btn-container');
        if (btnContainer) btnContainer.style.display = 'none';

        main.innerHTML = `
            <!-- Header -->
            <header class="mypage-header">
                <h1 class="app-logo">FlowFit</h1>
                <div class="menu-icon" id="menu-toggle">&#9776;</div>
            </header>

            <!-- Conteúdo Principal -->
            <section class="qrcode-container">
                <h2>O seu QR Code</h2>
                <p>Digitalize o QR Code abaixo ou utilize o link:</p>
                <div class="qrcode">
                    <img src="${qrCodeUrl}" alt="QR Code">
                </div>
                <p class="urlqrcode"><a href="${dynamicUrl}" target="_blank">${dynamicUrl}</a></p>
                <p class="client-status">Status do Cliente: <strong>${status}</strong></p>
            </section>

            <!-- Menu Overlay -->
            <div class="menu-overlay" id="menu-overlay">
                <nav class="menu-nav">
                    <a href="/mypage" class="menu-item">Home</a>
                    <a href="/qrcode" class="menu-item">CheckIn</a>
                    <a href="/mytraining" class="menu-item">Dicas de Treino</a>
                    <a href="/mynutrition" class="menu-item">Dicas de Nutrição</a>
                    <a href="/mytalk" class="menu-item">Dicas de AI</a>
                </nav>
                <div class="menu-footer">
                    <button id="logout-btn" class="menu-logout">Logout</button>
                </div>
            </div>

            <!-- Footer -->
            <footer class="mypage-footer">
                <nav>
                    <a href="/mypage" class="footer-icon" title="Home"><i class="fas fa-home"></i></a>
                    <a href="/qrcode" class="footer-icon active" title="QR Code"><i class="fas fa-qrcode"></i></a>
                    <a href="/mytraining" class="footer-icon" title="Dicas de Treino"><i class="fas fa-trophy"></i></a>
                    <a href="/mytalk" class="footer-icon" title="Chat Bot"><i class="fas fa-comments"></i></a>
                </nav>
            </footer>
        `;

        // Adiciona evento ao menu hamburger
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('menu-overlay').classList.toggle('active');
        });

        // Adiciona evento ao botão de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/';
        });
    },

    showMessage(message, isError = false) {
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="message ${isError ? 'error' : 'success'}">
                <p>${message}</p>
            </div>
        `;
    }
};
