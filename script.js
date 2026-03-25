
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('guess').value);
    const resultElement = document.getElementById('result');
    const attemptsElement = document.getElementById('attempts');
    attempts--;
    attemptsElement.textContent = `Tentativas restantes: ${attempts}`;
    if (attempts < 1) {
        resultElement.textContent = `Game Over! O número era ${randomNumber}.`;
        return;
    }
    if (userGuess === randomNumber) {
        resultElement.textContent = 'Parabéns! Você acertou! ';
    } else if (userGuess < randomNumber) {
        resultElement.textContent = 'Tente um número maior!';
    } else {
        resultElement.textContent = 'Tente um número menor!';
    }
}
            