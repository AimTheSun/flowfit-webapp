export const loginView = {
    render() {
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="login-container" id="login-container">
                <h2>Login</h2>
                <div class="form-group">
                    <input type="email" placeholder="Email" id="email" required />
                    <small class="error-message"></small>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" id="password" required minlength="8" />
                    <small class="error-message"></small>
                </div>
                <button class="login-btn" id="submit-login">Login</button>
                <p id="server-message" class="server-message"></p>
            </div>
        `;

        const submitButton = document.getElementById('submit-login');
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Validação local antes de enviar para o controller
            if (validateForm()) {
                const data = {
                    email: document.getElementById('email').value.trim(),
                    password: document.getElementById('password').value.trim()
                };

                document.dispatchEvent(new CustomEvent('submit-login', { detail: data }));
            }
        });

        function validateForm() {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            let isValid = true;

            // Validação do Email
            if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
                showInputError(emailInput, 'Formato de email inválido.');
                isValid = false;
            } else {
                clearInputError(emailInput);
            }

            // Validação da Password
            if (passwordInput.value.trim().length < 8) {
                showInputError(passwordInput, 'A senha deve ter pelo menos 8 caracteres.');
                isValid = false;
            } else {
                clearInputError(passwordInput);
            }

            return isValid;
        }

        function showInputError(input, message) {
            const errorMessage = input.nextElementSibling;
            errorMessage.textContent = message;
            input.style.borderColor = 'red';
        }

        function clearInputError(input) {
            const errorMessage = input.nextElementSibling;
            errorMessage.textContent = '';
            input.style.borderColor = 'green';
        }
    },

    showMessage(message, isError = false) {
        const messageElement = document.getElementById('server-message');
        messageElement.textContent = message;
        messageElement.style.color = isError ? 'red' : 'green';
    }
};
