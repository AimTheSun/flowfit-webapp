export const mypageService = {
    async getUserDataByEmail(email) {
        try {
            const response = await fetch('http://localhost:8080/clients/getClientByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do utilizador.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados do utilizador:', error.message);
            throw error;
        }
    }
};
