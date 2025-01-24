export const mytrainingView = {
    render(trainings) {
        const main = document.querySelector("main");

        document.querySelector("header").style.display = 'none';

        // Esconde os botões de login e registo
        const btnContainer = document.querySelector(".btn-container");
        if (btnContainer) btnContainer.style.display = "none";

        main.innerHTML = `
            <!-- Header -->
            <header class="mypage-header">
                <h1 class="app-logo">CORPO CULTO</h1>
                <div class="menu-icon" id="menu-toggle">&#9776;</div>
            </header>

            <!-- Conteúdo Principal -->
            <section class="mytraining-content">
                ${trainings.map((training, index) => `
                    <div class="training-block">
    <div class="training-image">
        <img src="${training.image}" alt="${training.title}">
      
    </div>
    <div class="training-details">
        <h2>${training.title}</h2>
        <div class="training-description">
            ${training.description.map(item => `<p>${item}</p>`).join('')}
        </div>
    </div>
</div>
                `).join('')}
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
                    <a href="/qrcode" class="footer-icon" title="QR Code"><i class="fas fa-qrcode"></i></a>
                    <a href="/mytraining" class="footer-icon active" title="Dicas de Treino"><i class="fas fa-trophy"></i></a>
                    <a href="/mytalk" class="footer-icon" title="Chat Bot"><i class="fas fa-comments"></i></a>
                </nav>
            </footer>
        `;

        // Adiciona evento ao menu hamburger
        document.getElementById("menu-toggle").addEventListener("click", () => {
            document.getElementById("menu-overlay").classList.toggle("active");
        });

        // Adiciona evento ao botão de logout
        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "/";
        });
    }
};
