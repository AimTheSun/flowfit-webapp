// service/registerService.js (corrigido)
export const registerService = {
    async sendRegistrationData(data) {
        // A senha já foi encriptada no controlador, não é necessário encriptar novamente
        console.log('Dados enviados para registo (simulados):', data);

        try {
            const response = await fetch('http://localhost:8080/clients/createClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Envia os dados sem alterações
            });

            if (!response.ok) {
                throw new Error(
                    'Não foi possível completar o registo. Tente novamente mais tarde.'
                );
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro no Registo:', error.message);
            throw new Error('Erro no registo, por favor tente mais tarde.');
        }
    }
};
