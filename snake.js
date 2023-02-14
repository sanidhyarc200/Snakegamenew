let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('./media/food.mp3');
const gameOverSound = new Audio('./media/gameover.mp3');
const moveSound = new Audio('./media/move.mp3');
// const musicSound = new Audio('');
// const abcud = new Audio('');
let speed = 16;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};
 danger = {x:3, y:4};
 dangers = {x:16, y:16}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    // if you bump in danger
    
    if(snake[0].x == 3  &&  snake[0].y == 4){
        return true;
    }
    // if you bump in dangers
    
    if(snake[0].x == 16  &&  snake[0].y == 16){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        // musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    

    dangerElement = document.createElement('div');
    dangerElement.style.gridRowStart = danger.y;
    dangerElement.style.gridColumnStart = danger.x;
    dangerElement.classList.add('danger')
    board.appendChild(dangerElement);
    
    
    dangersElement = document.createElement('div');
    dangersElement.style.gridRowStart = dangers.y;
    dangersElement.style.gridColumnStart = dangers.x;
    dangersElement.classList.add('dangers')
    
    board.appendChild(dangersElement);

    


}


// Main logic starts here
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
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

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

// var timer; 
// var timeLeft = 60; // seconds

// // What to do when the timer runs out
// function gameOver() {
//   // This cancels the setInterval, so the updateTimer stops getting called
//   cancelInterval(timer);
  
//   // re-show the button, so they can start it again
//   $('#playAgainButton').show();
// }

// function updateTimer() {
//   timeLeft = timeLeft - 1;
//   if(timeLeft >= 0)
//     $('#timer').html(timeLeft);
//   else {
//     gameOver();
//   }
// }

// // The button has an on-click event handler that calls this
// function start() {
//   // setInterval is a built-in function that will call the given function
//   // every N milliseconds (1 second = 1000 ms)
//   timer = setInterval(updateTimer, 1000);
  
//   // It will be a whole second before the time changes, so we'll call the update
//   // once ourselves
//   updateTimer();
  
//   // We don't want the to be able to restart the timer while it is running,
//   // so hide the button.
//    $('#playAgainButton').hide();
// }
// // consts and vars
// let direction = {x: 0, y: 0};
// const foodSound = new Audio('');
// const gameOverSound = new Audio('gameover.mp3');
// const moveSound = new Audio('');
// const musicSound = new Audio('');

// // game functions ..
// function main(ctime){
//     window.requestAnimationFrame(main)
//     console.log(ctime)
    
// }













// // main logic>>
// //window.requestAnimationFrame(Main);