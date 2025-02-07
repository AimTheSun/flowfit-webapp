export const qrcodeService = {
    async getClientDataByEmail(email) {
        console.log(`Simulação: Buscando dados do utilizador para o email "${email}"`);
        // Código real para quando o backend estiver ativo
        try {
            const response = await fetch('http://localhost:8080/clients/getClientByEmail', {
                method: 'POST', // Usamos POST para enviar dados no corpo
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }) // Envia o email no corpo
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do utilizador.');
            }
            const data = await response.json();
            return { id: data.id, status: data.status }; // Retorna o ID e o status
        } catch (error) {
            console.error('Erro ao obter os dados do utilizador:', error.message);
            throw error;
        }
    },
    async generateQrCode(url) {
        console.log(`Simulação: Gerando QR Code para o URL "${url}"`);
        // Usa a API real para gerar o QR Code
        return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=350x350`;
    }
};
