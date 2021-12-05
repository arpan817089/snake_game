//Game variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../eat.wav");
const game_over_sound = new Audio('../Game_over.wav');
const music_sound = new Audio('../Game_playing.mp3');
const move_sound = new Audio('../move.mp3');
let speed = 7;
let ct = 0;
let score = 0;
let score1 = 0;
let score2 = 0;
let last_pain_time = 0;
let st1, st2, st3;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 8 };
let name1 = prompt("Enter 1st player name :- ", "Guest1");
let name2;
//Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - last_pain_time) / 1000 < (1 / speed)) {
        return;
    }
    last_pain_time = ctime;
    gameEngine();
}

function isCollide(snake) {
    //If snake collide with himself
    for (let i = 1; i < snakeArr.length; i++) {
        if ((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y)) {
            ct++;
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        ct++;
        return true;
    }
}

function gameEngine() {
    //Adding body parts
    if (ct === 0) {
        score1 = score;
        console.log("score1 = " + score1);
        music_sound.play();
    }
    if (ct === 1) {
        score2 = score;
        console.log("score2 = " + score2);
    }
    if (isCollide(snakeArr) && (ct === 1)) {
        music_sound.pause();
        game_over_sound.play();
        name2 = prompt("Enter 2nd player name :- ", "Guest2");
        score = 0;
        scoreAdd.innerHTML = "Score = " + score;
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 13, y: 15 }
        ]
        music_sound.play();
    }
    if (ct === 2) {
        music_sound.pause();
        game_over_sound.play();
        if (score2 > score1) {
            alert("Congratulation!! " + name2 + ",You won the game..");
            st1 = "Congratulation!! " + name2 + ",You won the game..";
            const utterance = new SpeechSynthesisUtterance(st1);
            utterance.rate = 1;
            speechSynthesis.speak(utterance);
            st2 = "PLEASE FILL THE Google FORM " + name2 + " TO GET WINNER CERTIFICATE";
            const utter = new SpeechSynthesisUtterance(st2);
            utter.rate = 1;
            speechSynthesis.speak(utter);
            alert("PLEASE FILL THE Google FORM " + name2 + " TO GET WINNER CERTIFICATE");
            window.open("https://docs.google.com/forms/d/e/1FAIpQLSeH3USoUHlAtKERCJInrbY81xNm83W4BW6N-aCPajitDXBUww/viewform", '_blank');
        }
        else if (score2 < score1) {
            alert("Congratulation!! " + name1 + ",You won the game..");
            st1 = "Congratulation!! " + name1 + ",You won the game..";
            const utterance = new SpeechSynthesisUtterance(st1);
            utterance.rate = 1;
            speechSynthesis.speak(utterance);
            alert("PLEASE FILL THE Google FORM " + name1 + " TO GET WINNER CERTIFICATE");
            st2 = "PLEASE FILL THE Google FORM " + name1 + " TO GET WINNER CERTIFICATE";
            const utter = new SpeechSynthesisUtterance(st2);
            utter.rate = 1;
            speechSynthesis.speak(utter);
            window.open("https://docs.google.com/forms/d/e/1FAIpQLSeH3USoUHlAtKERCJInrbY81xNm83W4BW6N-aCPajitDXBUww/viewform", '_blank');
        }
        else if (score2 === score1) {
            alert(name1 + " and " + name2 + " both of you played well.Match drawn.So congratulation to both of you..");
            st1 = name1 + " and " + name2 + " both of you played well " + "match drawn" + "So congratulation to both of you.";
            const utterance = new SpeechSynthesisUtterance(st1);
            utterance.rate = 1;
            speechSynthesis.speak(utterance);
        }
    }
    if (ct > 2) {
        // game_over_sound.play();
        // music_sound.pause();
        // name2 = prompt("Enter 2nd player name :- ", "Guest2");
        music_sound.play();
        score = 0;
        scoreAdd.innerHTML = "Score = " + score;
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 13, y: 15 }
        ]
    }
    //After eaten food regenaration food 
    if ((snakeArr[0].y === food.y) && (snakeArr[0].x === food.x)) {
        foodSound.play();
        score += 1;
        if (score > Hiscoreval) {
            Hiscoreval = score;
            localStorage.setItem("Hiscore", JSON.stringify(Hiscoreval));
            Highscorebox.innerHTML = "HighScore = " + Hiscoreval;
        }
        scoreAdd.innerHTML = "Score = " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y
        });
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Snake movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] }; //For making snakeArr[i] a new object
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Display food,head,snake
    //Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//Main logic

let Hiscore = localStorage.getItem("Hiscore");
if (Hiscore === null) {
    Hiscoreval = 0;
    localStorage.setItem("Hiscore", JSON.stringify(Hiscoreval));
}
else {
    Hiscoreval = JSON.parse(Hiscore);
    Highscorebox.innerHTML = "HighScore = " + Hiscore;
}
window.requestAnimationFrame(main);
//Listen what key press
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Snake movement start by any key press
    move_sound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
