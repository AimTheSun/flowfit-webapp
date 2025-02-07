export const clientGymService = {
    async getClientsInGym() {
        try {
            const response = await fetch('http://localhost:8080/clients/clientsInGym', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível obter o número de clientes no ginásio.');
            }

            const result = await response.json();
            return result.clientsInGym; // Retorna apenas o número de clientes
        } catch (error) {
            console.error('Erro ao buscar clientes no ginásio:', error.message);
            throw new Error('Erro ao buscar clientes no ginásio, por favor tente mais tarde.');
        }
    }
};
