export const mynutritionView = {
    render(meals) {
        const main = document.querySelector("main");

        // Esconde o header principal
        document.querySelector("header").style.display = 'none';

        // Esconde os botões de login e registo
        const btnContainer = document.querySelector(".btn-container");
        if (btnContainer) btnContainer.style.display = "none";

        // Define o conteúdo da página
        main.innerHTML = `
            <!-- Header -->
            <header class="mypage-header">
                <h1 class="app-logo">CORPO CULTO</h1>
                <div class="menu-icon" id="menu-toggle">&#9776;</div>
            </header>

            <!-- Conteúdo Principal -->
            <section class="mynutrition-content">
                ${meals.map(meal => `
                    <div class="nutrition-card">
                        <div class="nutrition-image">
                            <img src="${meal.image}" alt="${meal.title}">
                        </div>
                        <div class="nutrition-details">
                            <h2>${meal.title}</h2>
                            <p class="nutrition-calories">Calorias: <strong>${meal.calories}</strong></p>
                            <div class="nutrition-description">
                                ${meal.description.map(item => `<p>${item}</p>`).join('')}
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
                    <a href="/mytalk" class="menu-item">Chat Bot</a>
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
                    <a href="/mytraining" class="footer-icon" title="Dicas de Treino"><i class="fas fa-trophy"></i></a>
                    <a href="/mynutrition" class="footer-icon active" title="Dicas de Nutrição"><i class="fas fa-apple-alt"></i></a>
                </nav>
            </footer>
        `;

        // Adiciona evento ao menu hamburger
        const menuToggle = document.getElementById("menu-toggle");
        const menuOverlay = document.getElementById("menu-overlay");

        if (menuToggle && menuOverlay) {
            menuToggle.addEventListener("click", () => {
                menuOverlay.classList.toggle("active");
            });
        }

        // Adiciona evento ao botão de logout
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.clear();
                window.location.href = "/";
            });
        }
    }
};
