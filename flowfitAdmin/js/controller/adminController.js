import { fetchClients, updateClientStatus } from '../service/adminService.js';
import { logout } from '../service/homeService.js';
import router from '../router.js';

export function init() {
    console.log("Admin Controller Inicializado!");
    const app = document.getElementById('app');
    app.innerHTML = "";
    if (!app) {
        console.error("Elemento com ID 'app' não encontrado!");
        return;
    }
    // Renderiza o HTML da página
    app.innerHTML = `
        <section id="adminPage" class="container mt-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>Administração de Clientes</h1>
                <a href="/" id="logoutBtn"><button class="btn btn-danger">Logout</button></a>
            </div>
           <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Point Goals</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="clientsTableBody">
                        <!-- Dados serão carregados dinamicamente -->
                    </tbody>
                </table>
            </div>
            <footer class="mt-4">
                <h5>Legenda dos Estados</h5>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Ativo:</strong> Cliente ativo no sistema.</li>
                    <li class="list-group-item"><strong>Inativo:</strong> Cliente inativo, mas registrado.</li>
                    <li class="list-group-item"><strong>Suspenso:</strong> Cliente com restrições temporárias.</li>
                </ul>
            </footer>
        </section>
    `;
    // Carrega os dados dos clientes
    loadClients();
    // Configura o botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (event) => {
        logout();

    });
}
// Carrega os dados dos clientes e renderiza na tabela
async function loadClients() {
    const clientsTableBody = document.getElementById('clientsTableBody');
    clientsTableBody.innerHTML = '<tr><td colspan="8">Carregando...</td></tr>';
    try {
        const clients = await fetchClients();
        clientsTableBody.innerHTML = clients.map(clientToTableRow).join('');
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        clientsTableBody.innerHTML = '<tr><td colspan="8" class="text-danger">Erro ao carregar os dados.</td></tr>';
    }
}
// Converte os dados de um cliente em uma linha da tabela
function clientToTableRow(client) {
    return `
        <tr>
            <td data-label="ID">${client.id}</td>
            <td data-label="First Name">${client.firstName}</td>
            <td data-label="Last Name">${client.lastName}</td>
            <td data-label="Email">${client.email}</td>
            <td data-label="Phone">${client.phoneNumber}</td>
            <td data-label="Point Goals">${client.points}</td>
            <td data-label="Status">${client.status}</td>
            <td data-label="Ações">
                <select class="form-select status-select" data-client-id="${client.id}">
                    <option>Select</option>
                    <option value="Ativo" ${client.status === 'Ativo' ? 'selected' : ''}>Ativo</option>
                    <option value="Inativo" ${client.status === 'Inativo' ? 'selected' : ''}>Inativo</option>
                    <option value="Suspenso" ${client.status === 'Suspenso' ? 'selected' : ''}>Suspenso</option>
                </select>
            </td>
        </tr>
    `;
}
// Event listener para alterar o estado do cliente
document.addEventListener('change', async (event) => {
    if (event.target.classList.contains('status-select')) {
        const clientId = event.target.dataset.clientId;
        const newStatus = event.target.value;
        try {
            await updateClientStatus(clientId, newStatus);
            console.log(`Status do cliente ${clientId} atualizado para ${newStatus}`);
        } catch (error) {
            console.error("Erro ao atualizar o status:", error);
        }
    }
});