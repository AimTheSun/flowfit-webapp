import { mytrainingView } from "../view/mytrainingView.js";

export const init = () => {
    console.log("MyTraining Controller Loaded");

    // Dados de treino simulados (poderão vir da base de dados futuramente)
    const trainings = [
        {
            title: "Cardio e Mobilidade",
            image: "images/cardio.jpg",
            description: [
                "1. Comece com 5 minutos de caminhada.",
                "2. Mobilidade: alongamentos dinâmicos.",
            ]
        },
        {
            title: "Agachamento",
            image: "images/agachamento2.jpg",
            description: [
                "1. Peito aberto, costas alinhadas.",
                "2. Pés afastados à largura dos ombros.",
                "3. Concentre-se em manter a postura.",
                "4. Peso no calcanhar."
            ]
        },
        {
            title: "Supino",
            image: "images/supinoreto.jpg",
            description: [
                "1. Pega firme, mãos levemente mais afastadas que os ombros.",
                "2. Desça o peso até o nível do peito.",
                "3. Foco no peito e tríceps."
            ]
        },
        {
            title: "Remada Curvada",
            image: "images/remada.jpg",
            description: [
                "1. Tronco a 45° com costas retas.",
                "2. Puxe o peso em direção ao abdômen.",
                "3. Cotovelos próximos ao corpo."
            ]
        },
        {
            title: "Elevação Lateral",
            image: "images/elevacaolateral.jpeg",
            description: [
                "1. Levante até a altura dos ombros.",
                "2. Braços levemente flexionados.",
                "3. Movimento controlado e evite balanços."
            ]
        }
    ];

    // Chama a view para renderizar os dados
    mytrainingView.render(trainings);
};
