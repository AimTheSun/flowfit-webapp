    import { homeService } from '../service/homeService.js';
    import { homeView } from '../view/homeView.js';

    export const init = () => {
        const frases = homeService.getCarouselData();

        // Renderizar frases do carrossel
        const track = document.querySelector('.carousel-track');
        const indicatorsContainer = document.querySelector('.carousel-indicators');

        frases.forEach((frase, index) => {
            // Criar itens do carrossel
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            slide.textContent = frase;
            track.appendChild(slide);

            // Criar indicadores
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            indicatorsContainer.appendChild(dot);
        });

        // Lógica do carrossel
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;

        function updateCarousel(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Carrossel automático
        setInterval(() => {
            currentIndex = (currentIndex + 1) % frases.length;
            updateCarousel(currentIndex);
        }, 3000);

        // Adicionar eventos de swipe no mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                currentIndex = (currentIndex + 1) % frases.length;
            } else if (touchEndX - touchStartX > 50) {
                currentIndex = (currentIndex - 1 + frases.length) % frases.length;
            }
            updateCarousel(currentIndex);
        });

        // Renderizar os botões
        homeView.renderButtons();
    };
