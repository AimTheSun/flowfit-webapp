import { mypageView } from '../view/mypageView.js';

export const init = async () => {
    console.log('Mypage Controller Loaded');

    // Render a default message indicating access without login
    const userName = 'Visitante'; // Default user name
    const monthlyGoalValue = 0; // Default goal value

    // Render the view with the default data
    mypageView.render(userName, monthlyGoalValue);
};
