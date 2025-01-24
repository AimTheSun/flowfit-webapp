// Função para obter o token de autenticação
function getAuthToken() {
    const authData = localStorage.getItem('authToken');
    return authData ? JSON.parse(authData).token : null;
}

/**
 * Busca os dados dos clientes da API
 */
export async function fetchClients() {
    const token = getAuthToken();
    try {
        const response = await fetch('http://ec2-54-225-116-123.compute-1.amazonaws.com/clients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            },
        });

        if (!response.ok) throw new Error('Erro ao buscar os dados dos clientes.');

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}

/**
 * Atualiza o status de um cliente via API
 */
export async function updateClientStatus(clientId, newStatus) {
    const token = getAuthToken();
    console.log(clientId);
    console.log(newStatus);

    if (newStatus === "Ativo") {
        newStatus = "activate";
    }
    if (newStatus === "Inativo") {
        newStatus = "deactivate";
    }
    if (newStatus === "Suspenso") {
        newStatus = "suspend";
    }

    console.log(newStatus);

    try {
        const response = await fetch(`http://ec2-54-225-116-123.compute-1.amazonaws.com/admins/${clientId}/${newStatus}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            },
            body: JSON.stringify({ status: newStatus }),
        });

        console.log(response);

        if (!response.ok) throw new Error('Erro ao atualizar o status do cliente.');
        console.log(`Cliente ${clientId} atualizado com sucesso para ${newStatus}.`);
        window.location.reload();
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        throw error;
    }
}

/**
 * Busca os dados de um cliente específico por ID
 */
export async function fetchClientDetails(clientId) {
    const token = getAuthToken();

    try {
        // Primeira chamada: Obter os dados do cliente
        const clientResponse = await fetch(`http://ec2-54-225-116-123.compute-1.amazonaws.com/clients/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            },
        }); s

        if (!clientResponse.ok) throw new Error('Erro ao buscar os dados do cliente.');
        const clientData = await clientResponse.json();

        // Segunda chamada: Obter o campo adicional
        const additionalResponse = await fetch(`http://ec2-54-225-116-123.compute-1.amazonaws.com/admins/${clientId}/verify`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            },
        });

        if (!additionalResponse.ok) throw new Error('Erro ao buscar os dados adicionais do cliente.');
        const additionalData = await additionalResponse.json();

        // Combinar os resultados e retornar
        return { ...clientData, additionalField: additionalData };
    } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
        throw error;
    }
}

