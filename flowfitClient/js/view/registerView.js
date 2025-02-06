export const registerView = {
    render() {
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="register-container" id="register-container">
                <h2>Registo</h2>
                <div class="form-group">
                    <input type="text" placeholder="Primeiro Nome" id="first-name" required />
                    <small class="error-message"></small>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Último Nome" id="last-name" required />
                    <small class="error-message"></small>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email" id="email" required />
                    <small class="error-message"></small>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" id="password" required minlength="8" />
                    <small class="error-message"></small>
                </div>
                <div class="form-group">
                    <input type="tel" placeholder="Número de Telemóvel" id="phone" pattern="\\d{9}" />
                    <small class="error-message"></small>
                </div>
                <button class="register-btn" id="submit-register">Registar</button>
                <p id="server-message" class="server-message"></p>
            </div>
        `;

        const submitButton = document.getElementById('submit-register');
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Validação local antes de enviar para o controller
            if (validateForm()) {
                const data = {
                    firstName: document.getElementById('first-name').value.trim(),
                    lastName: document.getElementById('last-name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    password: document.getElementById('password').value.trim(),
                    phoneNumber: document.getElementById('phone').value.trim()
                };

                document.dispatchEvent(new CustomEvent('submit-register', { detail: data }));
            }
        });

        function validateForm() {
            const fields = [
                { id: 'first-name', regex: /^.{2,}$/, error: 'Mínimo 2 caracteres.' },
                { id: 'last-name', regex: /^.{2,}$/, error: 'Mínimo 2 caracteres.' },
                { id: 'email', regex: /^\S+@\S+\.\S+$/, error: 'Formato de email inválido.' },
                { id: 'password', regex: /^.{8,}$/, error: 'Mínimo 8 caracteres.' },
                { id: 'phone', regex: /^\d{9}$/, error: 'Deve conter exatamente 9 dígitos.' }
            ];

            let isValid = true;

            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const errorMessage = input.nextElementSibling;
                const value = input.value.trim();

                if (!field.regex.test(value)) {
                    input.style.borderColor = 'red';
                    errorMessage.textContent = field.error;
                    isValid = false;
                } else {
                    input.style.borderColor = 'green';
                    errorMessage.textContent = '';
                }
            });

            return isValid;
        }
    },

    showMessage(message, isError = false) {
        const messageElement = document.getElementById('server-message');
        messageElement.textContent = message;
        messageElement.style.color = isError ? 'red' : 'green';
    }
};
