// Game constants and variables
let inputDir = { x: 0, y: 0 };
const eatSound = new Audio('music/eat.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const bgmusicSound = new Audio('music/bgmusic.mp3')
let lastPaintTime = 0;
let speed = 6;
// let hiscoreval=0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 3, y: 5 }
let score = 0;



// Game Functions
let main = (currentTime) => {
    window.requestAnimationFrame(main);
    console.log(currentTime);

    if ((currentTime - lastPaintTime) / 1000 < 1 / speed)
        return;

    lastPaintTime = currentTime;
    gameEngine();
}

let isCollide = (snake) => {
    // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y)
            return true;

    }
    // If you bump into wall 
    if (snake[0].x <= 1 || snake[0].x >= 18 || snake[0].y <= 1 || snake[0].y >= 18)
        return true;

    return false;
}

let gameEngine = () => {
    //(1) Upadate the Snake array and Food
    // Updating the Snake array
    if (isCollide(snakeArr)) {
        bgmusicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over . Press any key to Play Again!")
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        bgmusicSound.play();
    }



    if (score > hiscoreval) {
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }



    // if you have eaten the food then , increment score and regenerate food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        eatSound.play();
        score++;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score : " + hiscoreval;
        }
        let scoreBox = document.getElementById("scoreBox");
        scoreBox.innerHTML = "Score : " + score;
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //(2) Display the Snake and Food
    // Display the Snake
    let board = document.getElementById("board");
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

};



// Main logic stars here
// bgmusicSound.play();
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    let hiscoreBox = document.getElementById("hiscoreBox");
    hiscoreBox.innerHTML = "High Score : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowRight" || e.key == "ArrowLeft") {
        const press = document.getElementsByClassName("beforeStart");
        press[0].classList.add('vanish');
        bgmusicSound.play();
        inputDir = { x: 0, y: 0 }; // Start the Game
        switch (e.key) {
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;

            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            default:
                break;
        }
    }
});