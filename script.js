const textValue = "Este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective."

const typingText = document.getElementById("typingText");
const textTypingSpeedGameValue = document.getElementById("textTypingSpeedGame");
const seconds = document.getElementById("seconds");
const countCorectWordElement = document.getElementById("countCorectWord");
const restartGame = document.getElementById("restartGame");
const words = textValue.trim().split(" ");
const char = textValue.trim().split("");
let charIndex = 0;
let timer = 60;
let startTimer = true;
let stopSetInterval;
let isTyping = true;

function renderText() {
    const wordChar = textValue.split("");
    wordChar.forEach(function (char) {
        textTypingSpeedGameValue.innerHTML += "<span>" + char + "</span>";
    });
}

function checkChar(inputValue) {
    const textChars = document.querySelectorAll("span");
    const inputChar = inputValue.split("")[charIndex];

    if (inputChar === textChars[charIndex].innerText) {
        textChars[charIndex].classList.add("corect");
        charIndex++;
    } else {
        textChars[charIndex].classList.add("incorect");
        charIndex++;
    }
}

function checkWord(inputValue) {
    const inputWords = inputValue.split(" ");
    let countCorectWord = 0;

    inputWords.forEach(function (inputWord, index) {
        if (inputWord === words[index]) {
            countCorectWord++;
            countCorectWordElement.innerHTML = countCorectWord;
        }
    });
}

function timerCount() {
    --timer;
    if (timer <= 0) {
        isTyping = false;
        clearInterval(stopSetInterval);
    }
    seconds.innerText = timer + "s";
}

document.addEventListener("keydown", () => typingText.focus());
document.addEventListener("click", () => typingText.focus());
restartGame.addEventListener("click", () => window.location.reload());

typingText.addEventListener("input", function (e) {
    if (isTyping) {
        if (startTimer) {
            stopSetInterval = setInterval(timerCount, 1000);
        }
        startTimer = false;

        const inputValue = this.value;
        checkWord(inputValue);
        checkChar(inputValue);
    }
});



renderText();