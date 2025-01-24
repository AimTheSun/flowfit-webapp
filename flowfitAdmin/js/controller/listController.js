import { isUserLoggedIn } from '../service/homeService.js';
import { fetchClientDetails } from '../service/adminService.js';
import router from '../router.js';

export function init(params) {
    const app = document.getElementById('app');
    if (!app) {
        console.error("Elemento com ID 'app' não encontrado!");
        return;
    }

    // Verifica login antes de continuar
    if (!isUserLoggedIn()) {
        console.log("Usuário não autenticado. Redirecionando para login...");
        const currentPath = `/admins/${params.clientId}/verify`;
        router.navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
    }

    // Renderiza o layout inicial
    app.innerHTML = `
        <section id="listPage" class="container mt-5">
            <h1 id="pageTitle">Detalhes do Cliente</h1>
            <div id="errorMessage" class="alert alert-danger d-none"></div>
            <div id="clientData" class="card d-none">
                <div class="card-body">
                    <h5 class="card-title" id="clientName"></h5>
                    <p class="card-text" id="clientEmail"></p>
                    <p class="card-text" id="clientPhone"></p>
                    <p class="card-text" id="clientPointGoals"></p>
                    <p class="card-text" id="clientStatus"></p>
                    <p class="card-text" id="additionalField"></p>
                </div>
            </div>
        </section>
    `;

    // Busca os dados do cliente
    fetchClientData(params.clientId);
}

// Função para exibir mensagens de erro
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Função para buscar e exibir os dados do cliente
async function fetchClientData(clientId) {
    const clientDataCard = document.getElementById('clientData');
    const errorMessage = document.getElementById('errorMessage');

    try {
        const clientDetails = await fetchClientDetails(clientId);
        if (!clientDetails) {
            showError("Cliente não encontrado. Verifique o ID fornecido.");
            return;
        }

        // Exibe os dados do cliente
        document.getElementById('clientName').textContent = `${clientDetails.firstName} ${clientDetails.lastName}`;
        document.getElementById('clientEmail').textContent = `Email: ${clientDetails.email}`;
        document.getElementById('clientPhone').textContent = `Telefone: ${clientDetails.phoneNumber}`;
        document.getElementById('clientPointGoals').textContent = `Pontos: ${clientDetails.points}`;
        document.getElementById('clientStatus').textContent = `Status: ${clientDetails.status}`;
        document.getElementById('additionalField').textContent = `Estado: ${JSON.stringify(clientDetails.additionalField.message)}`;

        // Manipula o <p> para incluir a classe dinâmica e o texto
        const additionalField = document.getElementById('additionalField');
        const message = JSON.stringify(clientDetails.additionalField.message);
        const dynamicClass = `state${message.replace(/[" ]/g, '')}`; // Remove aspas e espaços do JSON.stringify
        additionalField.classList.add(dynamicClass);
        additionalField.textContent = `Estado: ${message}`;

        clientDataCard.classList.remove('d-none');
    } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
        showError("Erro ao buscar detalhes do cliente. Tente novamente mais tarde.");
    }
}
