import router from "../router.js";

export const homeView = {
    renderCarousel(frases) {
        const container = document.querySelector(".carousel-container");
        container.innerHTML = frases
            .map(frase => `<div class="carousel-item">${frase}</div>`)
            .join("");
    },

    renderButtons() {
        const footer = document.querySelector(".btn-container");
        footer.innerHTML = `
            <a href="/register" class="btn">Registo</a>
            <a href="/login" class="btn">Login</a>
        `;

        // Evento no botão de Login
        document.querySelector("a[href='/login']").addEventListener("click", (e) => {
            e.preventDefault();
            router.navigate('/login');
        });

        // Evento no botão de Registo
        document.querySelector("a[href='/register']").addEventListener("click", (e) => {
            e.preventDefault();
            router.navigate('/register');
        });
    }
};
