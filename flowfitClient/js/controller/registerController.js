import { registerView } from "../view/registerView.js";
import { registerService } from "../service/registerService.js";
import router from "../router.js";

export const init = () => {
    console.log("Register Controller Loaded");

    // Renderiza a view do registo
    registerView.render();

    // Adiciona o evento personalizado para submissão do formulário
    document.addEventListener("submit-register", async (e) => {
        const data = e.detail;

        try {
            // Encripta a password antes de enviar
            const encryptedData = {
                ...data,
                password: CryptoJS.SHA256(data.password).toString(),
            };

            // Envia os dados ao serviço de registo
            const response = await registerService.sendRegistrationData(encryptedData);

            console.log(response.message);
            console.log(response.token);
            // Armazenar o token e tempo de sessão
            if (response.message === "true") {
                localStorage.setItem("token", response.token);
                localStorage.setItem("tokenExpiration", Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 dias
                router.navigate("/login");
            }

            registerView.showMessage("Registo efetuado com sucesso!", false);
        } catch (error) {
            console.error("Erro no registo:", error.message);
            registerView.showMessage("Erro no registo, por favor tente mais tarde.", true);
        }
    });
};
