export const fetchResponseFromAPI = async (message, mode) => {
    const systemPrompt =
        mode === 'personal_trainer'
            ? 'Você é um Personal Trainer profissional. Responda de forma motivacional.'
            : 'Você é um Nutricionista experiente. Responda com conselhos nutricionais.';
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer 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`, // Substituir pela sua API Key
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
            }),
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        return 'Erro ao obter a resposta. Tente novamente mais tarde.';
    }
};