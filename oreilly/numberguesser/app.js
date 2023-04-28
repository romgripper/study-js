let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//console.log(`Winning number is ${winningNum}`);

const game = document.getElementById("game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessInput = document.querySelector("#guess-input"),
    guessBtn = document.querySelector("#guess-btn"),
    message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("play-again")) window.location.reload();
});

guessBtn.addEventListener("click", function () {
    let guess = parseInt(guessInput.value);
    console.log(guess);
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else if (--guessesLeft === 0) {
        gameOver(
            false,
            `Game Over, you lost. The correct number was ${winningNum}`
        );
    } else {
        guessInput.style.borderColor = "red";
        guessInput.value = "";
        setMessage(
            `${guess} is not correct. You have ${guessesLeft} guess(es) left`,
            "red"
        );
    }
});

function gameOver(won, msg) {
    const color = won ? "green" : "red";
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg, color);

    guessBtn.value = "Play Again";
    guessBtn.classList.add("play-again");
    guessBtn.remove;
}

function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

function getRandomNum(min, max) {
    return min + Math.ceil(Math.random() * (max - min));
}
