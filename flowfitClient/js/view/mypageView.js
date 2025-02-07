import { clientGymService } from '../service/clientGymService.js';

export const mypageView = {
    async render(userName, monthlyGoalValue) {
        const totalGoal = 20; // Total goal (e.g., 20 points)
        const progressPercentage = Math.min((monthlyGoalValue / totalGoal) * 100, 100); // Calculate progress percentage

        const main = document.querySelector('main');

        // Fetch the client count asynchronously
        const clientCount = await clientGymService.getClientsInGym();

        main.innerHTML = `
        <!-- Header -->
        <header class="mypage-header">
            <h1 class="app-logo">CORPO CULTO</h1>
            <div class="menu-icon" id="menu-toggle">&#9776;</div>
        </header>

        <!-- Main Content -->
        <section class="mypage-content">
            <h3 class="welcome-message">Bem-vindo, <span>${userName}</span></h3>

            <!-- Objetivo do Mês -->
            <div class="goal-container">
                <p class="goal-text">Objetivo do Mês</p>
                <p class="goal-value">${monthlyGoalValue} / ${totalGoal}</p>
                <div class="goal-bar">
                    <div class="goal-bar-inner" style="width: ${progressPercentage}%;"></div> <!-- Dynamic progress -->
                </div>
            </div>
<!-- Clients in Gym Widget -->
<div class="clients-gym-container">
    <div class="pulse-container">
        <div class="client-progress"></div>
        <div class="client-count-wrapper">
            <div id="clients-count" class="client-count">
                <span class="number">${clientCount}</span>
                <span class="label">Pessoas no ginásio neste momento    </span>
            </div>
        </div>
    </div>
</div>

            <!-- Linha de Separação -->
            <div class="section-divider"></div>

            <!-- Bloco de Treino -->
            <div class="training-grid">
                <div class="training-card" onclick="window.location.href='/mytraining'">
                    <div class="training-image-wrapper">
                        <img src="images/deadlift.jpg" alt="Treino de Braços" class="training-image">
                        <div class="training-overlay">
                            <p class="training-title">Treino de Força</p>
                        </div>
                    </div>
                </div>
                <div class="training-card" onclick="window.location.href='/mynutrition'">
                    <div class="training-image-wrapper">
                        <img src="images/alimentos.jpg" alt="Dicas de Alimentação" class="training-image">
                        <div class="training-overlay">
                            <p class="training-title">Alimentação - Boost Nutricional</p>
                        </div>
                    </div>
                </div>
                <div class="training-card" >
                    <div class="training-image-wrapper">
                        <img src="images/cycling.jpg" alt="Dicas de Cardio" class="training-image">
                        <div class="training-overlay">
                            <p class="training-title">Cycling</p>
                        </div>
                    </div>
                </div>
                <div class="training-card">
                    <div class="training-image-wrapper">
                        <img src="images/pump.jpg" alt="Mobilidade e Yoga" class="training-image">
                        <div class="training-overlay">
                            <p class="training-title">Pump</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </section>

        <!-- Menu Overlay -->
        <div class="menu-overlay" id="menu-overlay">
            <nav class="menu-nav">
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
                <a href="/mypage" class="footer-icon" title="Home">
                    <i class="fas fa-home"></i>
                </a>
                <a href="/qrcode" class="footer-icon" title="QR Code">
                    <i class="fas fa-qrcode"></i>
                </a>
                <a href="/mytraining" class="footer-icon" title="Dicas de Treino">
                    <i class="fas fa-trophy"></i>
                </a>
                <a href="/mytalk" class="footer-icon" title="Chat Bot">
                    <i class="fas fa-comments"></i>
                </a>
            </nav>
        </footer>
        `;

        // Define active icon based on the current route
        const currentPath = window.location.pathname;
        document.querySelectorAll('.footer-icon').forEach(icon => {
            if (icon.getAttribute('href') === currentPath) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });

        document.querySelector('header').style.display = 'none';
        document.querySelector('.btn-container').style.display = 'none';

        // Menu Toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('menu-overlay').classList.toggle('active');
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/';
        });
    }
};
