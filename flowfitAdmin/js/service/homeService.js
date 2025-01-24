/**
 * Validação de login - Conexão com a API real
 */
export async function validateLoginAPI(email, password) {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    console.log("Username:", username);
    console.log("Password encriptada (API):", encryptedPassword);

    console.log(JSON.stringify({ email, password: encryptedPassword }));

    try {
        const response = await fetch('http://ec2-54-225-116-123.compute-1.amazonaws.com/admins/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: encryptedPassword }),
        });

        if (!response.ok) {
            console.error("Erro na requisição da API:", response.statusText);
            throw new Error("Erro na requisição da API.");
        }

        const data = await response.json();
        console.log("Resposta da API:", data);
        console.log(data.authenticated)

        // Persistência do login por 5 dias (real)
        if (data.authenticated) {
            const expirationTime = new Date();
            expirationTime.setDate(expirationTime.getDate() + 5);

            localStorage.setItem('authToken', JSON.stringify({
                username,
                expiration: expirationTime.toISOString(),
            }));
        }

        return data.authenticated|| false;
    } catch (error) {
        console.error("Erro ao conectar com a API:", error.message);
        throw error;
    }
}

/**
 * Verifica se o usuário está logado e o token é válido
 */
export function isUserLoggedIn() {
    const authData = localStorage.getItem('authToken');
    if (!authData) return false;

    const { expiration } = JSON.parse(authData);
    const now = new Date();

    // Remove token se expirado
    if (now.toISOString() >= expiration) {
        localStorage.removeItem('authToken');
        return false;
    }

    return true;
}

/**
 * Realiza logout do usuário
 */
export function logout() {
    localStorage.removeItem('authToken');
    console.log("Usuário deslogado.");
}
