import { clientGymService } from '../service/clientGymService.js';
import { ClientGymView } from '../view/clientGymView.js';

export const init = async () => {
    console.log('Clients Gym Controller Loaded');

    try {
        // Fetch the number of clients in the gym from the API
        const clientsInGym = await clientGymService.getClientsInGym();
        const container = document.querySelector('#app'); // or the desired container
        const clientGymView = new ClientGymView(container);
        clientGymView.render(clientsInGym); // Pass the dynamic data to the view
    } catch (error) {
        console.error('Erro ao carregar número de clientes no ginásio:', error.message);
    }
};
