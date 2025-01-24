import { ChatView } from '../view/mytalkView.js';
import { fetchResponseFromAPI } from '../service/mytalkService.js';
export const init = () => {
    console.log("MyTalk Controller Loaded");
    const chatView = new ChatView();
    chatView.render();
    let currentRole = null; // Papel selecionado (Personal Trainer ou Nutricionista)
    // Seleção de papel
    chatView.bindRoleSelection((role) => {
        currentRole = role;
        chatView.setActiveRole(role);
    });
    // Envio de mensagens
    chatView.bindSendMessage(async (message) => {
        if (!currentRole) {
            chatView.addMessage('error', 'Por favor, selecione um profissional para conversar.');
            return;
        }
        chatView.addMessage('user', message);
        try {
            const response = await fetchResponseFromAPI(message, currentRole);
            chatView.addMessage('ai', response);
        } catch (error) {
            console.error('Erro ao obter resposta do chatbot:', error);
            chatView.addMessage('error', 'Desculpe, ocorreu um erro ao processar sua mensagem.');
        }
    });
};