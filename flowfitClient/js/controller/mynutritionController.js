import { mynutritionView } from "../view/mynutritionView.js";

export const init = () => {
    console.log("MyNutrition Controller Loaded");

    // Dados simulados de sugestões de nutrição
    const meals = [
        {
            title: "Pequeno Almoço",
            calories: "350 kcal",
            image: "images/alimentos.jpg",
            description: [
                "1. Taça de iogurte natural com flocos de aveia e 1 fruta pequena (ex: maçã ou banana).",
                "2. Fatia de pão integral com queijo fresco ou fiambre de peru.",
                "3. Chávena de café ou chá sem açúcar."
            ]
        },
        {
            title: "Almoço",
            calories: "500 kcal",
            image: "images/almocosaudavel.jpg",
            description: [
                "1. Porção de arroz integral ou batata-doce.",
                "2. Peito de frango grelhado ou peixe assado (ex: pescada).",
                "3. Salada simples com alface, tomate e pepino, temperada com azeite e limão.",
                "4. Copo de água."
            ]
        },
        {
            title: "Lanche",
            calories: "200 kcal",
            image:"images/lanche.jpg",
            description: [
                "1. Iogurte natural com granola.",
                "2. Taça de amêndoas (30g).",
                "3. Banana pequena.",
                "4. Copo de água."
            ]
        },
        {
            title: "Jantar",
            calories: "500 kcal",
            image: "images/jantar.jpg",
            description: [
                "1. Salmão grelhado com brócolos.",
                "2. Batata assada ou batata-doce.",
                "3. Salada verde com pepino e tomate.",
                "4. Chávena de chá de camomila."
            ]
        }
    ];

    // Chama a view para renderizar os dados
    mynutritionView.render(meals);
};
