import { mypageService } from '../service/mypageService.js';
import { mypageView } from '../view/mypageView.js';
import router from '../router.js';

export const init = async () => {
    console.log('Mypage Controller Loaded');

    // Verificar sessão ativa
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userEmail = localStorage.getItem('userEmail');

    if (!token || Date.now() > tokenExpiration) {
        localStorage.clear();
        router.navigate('/login');
        return;
    }

    try {
        // Busca os dados do utilizador pela API
        const userData = await mypageService.getUserDataByEmail(userEmail);

        // Extrai os dados necessários
        const userName = `${userData.firstName} ${userData.lastName}`;
        const monthlyGoalValue = userData.points || 0;

        // Renderiza a view com os dados obtidos
        mypageView.render(userName, monthlyGoalValue);
    } catch (error) {
        console.error('Erro ao carregar os dados do utilizador:', error.message);
        router.navigate('/login');
    }
};
