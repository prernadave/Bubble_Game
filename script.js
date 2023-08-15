var timer = 60;
var score = 0;
var bubbleNumber;
// model
var restartButton = document.getElementById("restartButton");
var gameOverModal = document.getElementById("gameOverModal");
var finalScoreSpan = document.getElementById("finalScore");
var closeSpan = document.querySelector(".close");


// bubble making
function makeBubble() {
    var clutter = "";

    for (var i = 1; i <= 171; i++) {
        var run = Math.floor(Math.random() * 10);
        var delay = Math.random() * 2; // Generate a random delay between 0 and 2 seconds
        clutter += `<div class="bubble" style="animation-delay: ${delay}s;">${run}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
    addBubbleClickListeners();
}

// timer setting
function setTimer() {
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerVal").textContent = timer;
        } else {
            clearInterval(timerInt);
            showGameOverModal(); // model will be displayed when the timer is reached the end of the game.
        }
    }, 1000);
}


// for changing the hits value
function getNewHit() {
    var rn = Math.floor(Math.random() * 10);
    document.querySelector("#hitVal").textContent = rn;
}

// for increasing the score value
function increaseScore() {
    score += 10;
    document.querySelector("#scoreVal").textContent = score;
}


// for capturing the bubble values and updating the score
function addBubbleClickListeners() {
    var bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(function (bubble) {
        bubble.addEventListener("click", function () {
            var bubbleValue = parseInt(bubble.textContent);
            var hitValue = parseInt(document.querySelector("#hitVal").textContent);
            if (bubbleValue === hitValue) {
                increaseScore();
                getNewHit();
                makeBubble();
            }
        });
    });
}


// restart the game

function restartGame() {
    timer = 60;
    score = 0;
    document.querySelector("#scoreVal").textContent = score; // Reset the score displayed on the page
    getNewHit();
    makeBubble();
    setTimer();
    gameOverModal.style.display = "none";
}

restartButton.addEventListener("click", restartGame);


// game over modal
function showGameOverModal() {
    finalScoreSpan.textContent = score;
    gameOverModal.style.display = "block";
}
// close span button
closeSpan.addEventListener("click", function () {
    gameOverModal.style.display = "none";
    restartGame()
});

setTimer();
makeBubble();
getNewHit();
