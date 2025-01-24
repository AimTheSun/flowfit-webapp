export const registerService = {
    async sendRegistrationData(data) {
        // Encripta a password antes de enviar
        const encryptedPassword = CryptoJS.SHA256(data.password).toString();

        console.log('Dados enviados para registo (simulados):', {
            ...data,
            password: encryptedPassword
        });

        // Código comentado para quando o backend estiver ligado
        try {
            const response = await fetch('http://localhost:50005/clients/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, password: encryptedPassword })
            });

            if (!response.ok) {
                throw new Error(
                    'Não foi possível completar o registo. Tente novamente mais tarde.'
                );
            }

            const result = await response.json();
            return result; // Retorna os dados de sucesso
        } catch (error) {
            console.error('Erro no Registo:', error.message);
            throw new Error('Erro no registo, por favor tente mais tarde.'); // Mensagem amigável
        }
    }
};
