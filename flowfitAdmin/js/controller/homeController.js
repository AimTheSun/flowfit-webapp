import { validateLoginAPI, isUserLoggedIn } from '../service/homeService.js';
import router from '../router.js';

export function init() {
    if (isUserLoggedIn()) {
        const redirectURL = new URLSearchParams(window.location.search).get('redirect') || '/admin';
        console.log("Usuário já logado. Redirecionando para:", redirectURL);
        router.navigate(redirectURL);
        return;
    }

    loadInitialApp();

    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';

        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            toggleLoading(true);
            console.log("Validando credenciais...");
            const success = await validateLoginAPI(email, password);

            if (success) {
                const redirectURL = new URLSearchParams(window.location.search).get('redirect') || '/admin';
                console.log("Login bem-sucedido! Redirecionando para:", redirectURL);
                router.navigate(redirectURL);
            } else {
                errorMessage.textContent = "Credenciais inválidas. Tente novamente.";
            }
        } catch (error) {
            console.error("Erro durante a validação de login:", error);
            errorMessage.textContent = "Erro de conexão. Verifique sua internet ou tente mais tarde.";
        } finally {
            toggleLoading(false);
        }
    });

    function toggleLoading(isLoading) {
        submitBtn.disabled = isLoading;
        loadingSpinner.style.display = isLoading ? 'block' : 'none';
    }
}

function loadInitialApp() {
    const app = document.querySelector("#app");

    app.innerHTML = "";

    // Criação da estrutura do formulário (mesmo código anterior)
    const loginContainer = document.createElement('section');
    loginContainer.classList.add('login-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Login';
    loginContainer.appendChild(h1);

    const form = document.createElement('form');
    form.id = 'loginForm';
    form.noValidate = true;
    loginContainer.appendChild(form);

    const usernameGroup = document.createElement('div');
    usernameGroup.classList.add('form-group');
    form.appendChild(usernameGroup);

    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.textContent = 'Username';
    usernameGroup.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.placeholder = 'Enter your username';
    usernameInput.required = true;
    usernameInput.minLength = 4;
    usernameInput.maxLength = 20;
    usernameInput.autocomplete = 'username';
    usernameGroup.appendChild(usernameInput);

    const usernameErrorText = document.createElement('small');
    usernameErrorText.classList.add('error-text');
    usernameGroup.appendChild(usernameErrorText);

    const passwordGroup = document.createElement('div');
    passwordGroup.classList.add('form-group');
    form.appendChild(passwordGroup);

    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.textContent = 'Password';
    passwordGroup.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Enter your password';
    passwordInput.required = true;
    passwordInput.minLength = 6;
    passwordInput.maxLength = 30;
    passwordInput.autocomplete = 'current-password';
    passwordGroup.appendChild(passwordInput);

    const passwordErrorText = document.createElement('small');
    passwordErrorText.classList.add('error-text');
    passwordGroup.appendChild(passwordErrorText);

    const errorMessage = document.createElement('div');
    errorMessage.id = 'errorMessage';
    errorMessage.classList.add('error-message');
    form.appendChild(errorMessage);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.id = 'submitBtn';
    submitBtn.textContent = 'Login';
    form.appendChild(submitBtn);

    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading';
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.style.display = 'none';
    form.appendChild(loadingSpinner);

    app.appendChild(loginContainer);
}
