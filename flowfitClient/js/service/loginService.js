export const loginService = {
    async sendLoginData(data) {
        try {
            const response = await fetch('http://localhost:8080/clients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Envia os dados já criptografados
            });

            if (!response.ok) {
                throw new Error(
                    'Não foi possível efetuar o login. Verifique suas credenciais e tente novamente.'
                );
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro no Login:', error.message);
            throw new Error('Erro no login, por favor tente mais tarde.');
        }
    }
};
