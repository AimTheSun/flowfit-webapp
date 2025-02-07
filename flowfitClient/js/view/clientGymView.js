export class ClientGymView {
    constructor(container) {
        this.container = container;
    }

    async render(clientsInGym) {
        // Accept clientsInGym as a parameter
        this.container.innerHTML = `
          <header class="mypage-header">
            <h1 class="app-logo">CORPO CULTO</h1>
            <div class="menu-icon" id="menu-toggle">&#9776;</div>
        </header>
            <section class="clients-gym-container">
                <h2 class="title">Clientes no Ginásio</h2>
                <div id="clients-count" class="clients-count">
                    <div class="client-ball">${clientsInGym}</div> <!-- Display the number of clients -->
                </div>
            </section>
        `;
    }
}
