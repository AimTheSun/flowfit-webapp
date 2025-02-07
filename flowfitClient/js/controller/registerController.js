// controller/registerController.js (corrigido)
import { registerView } from '../view/registerView.js';
import { registerService } from '../service/registerService.js';
import router from '../router.js';

export const init = () => {
    console.log('Register Controller Loaded');
    registerView.render();

    document.addEventListener('submit-register', async e => {
        const data = e.detail;

        try {
            // Encripta a senha uma única vez
            const encryptedData = {
                ...data,
                password: CryptoJS.SHA256(data.password).toString() // Encriptação única
            };

            // Envia os dados já encriptados
            const response = await registerService.sendRegistrationData(encryptedData);

            if (response.message === 'true') {
                localStorage.setItem('token', response.token);
                localStorage.setItem('tokenExpiration', Date.now() + 5 * 24 * 60 * 60 * 1000);
                router.navigate('/login');
            }

            registerView.showMessage('Registo efetuado com sucesso!', false);
        } catch (error) {
            console.error('Erro no registo:', error.message);
            registerView.showMessage('Erro no registo, por favor tente mais tarde.', true);
        }
    });
};
