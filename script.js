// JavaScript
let player = document.getElementById("player");
let container = document.getElementById("container");
let orange1 = document.getElementById("orange1");
let orange2 = document.getElementById("orange2");


let mousePosX;
let gravity = 0.3;
let speedY = 0;
let score = 0;
let scoreText = document.querySelector("h1");

container.addEventListener("click", flyUp);

function flyUp(event) {
    speedY = -10;
    mousePosX = event.clientX - container.offsetLeft;
}

function update() {
    updateBG();
    updatePlayer();

    updateOrange1();
    updateOrange2();

    checkForItemCollect(orange1);
    checkForItemCollect(orange2);
    window.requestAnimationFrame(update);
}

function updateBG() {
    container.style.backgroundPositionX -= 10;
}

function updatePlayer() {
    // horizontal moves
    let diffX = mousePosX - player.offsetLeft - (player.offsetWidth/2);
    let playerTargetX = player.offsetLeft + (diffX * 0.015);
    player.style.left = playerTargetX + "px";


    // vertical moves
    speedY += gravity;
    let playerTargetY = player.offsetTop + speedY;
    if (playerTargetY > container.offsetHeight) {
        playerTargetY = container.offsetHeight;
    }
    player.style.top = playerTargetY + "px";


    // rotate
    if (speedY < -5) {
        // going up
        player.style.transform = "rotate(-25deg)";
    }
    else if (speedY > 5) {
        // falling down
        player.style.transform = "rotate(25deg)";
    }
    else {
        player.style.transform = "rotate(0deg)";
    }
}

function updateOrange1() {
    let targetOrange1X = orange1.offsetLeft - 5;
    if (targetOrange1X < -orange1.offsetWidth) {
        targetOrange1X = container.offsetWidth;
        orange1.style.top = (Math.random() * 400) + "px";
    }
    orange1.style.left = targetOrange1X + "px";
}

function updateOrange2() {
    let targetOrange2X = orange2.offsetLeft - 8;
    if (targetOrange2X < -orange2.offsetWidth) {
        targetOrange2X = container.offsetWidth;
        orange2.style.top = (Math.random() * 400) + "px";
    }
    orange2.style.left = targetOrange2X + "px";
}

function checkForItemCollect(item) {
    let diffX = (item.offsetLeft + (item.offsetWidth/2)) - (player.offsetLeft + (player.offsetWidth/2));
    //console.log(diffX);
    
    let diffY = (item.offsetTop + (item.offsetHeight/2)) - (player.offsetTop + (player.offsetHeight/2));
    //console.log(diffY);

    if (Math.abs(diffX) < 40 && Math.abs(diffY) < 40) {
        //console.log("collect item");
        item.style.left = container.offsetWidth + "px";
        item.style.top = (Math.random() * 400) + "px";

        if (item == orange1) {
            score++;
        }
        else if (item == orange2) {
            score--;
        }
        scoreText.innerHTML = "score: " + score;
    }
}

window.requestAnimationFrame(update);




window.onload = window.onresize = resizeGame;

function resizeGame() {
    let gameRatio = container.offsetWidth / container.offsetHeight;
    let windowRatio = window.innerWidth / window.innerHeight;
    
    container.style.position = "absolute";
    container.style.left = `${(window.innerWidth - container.offsetWidth) / 2}px`;
    container.style.top = `${(window.innerHeight - container.offsetHeight) / 2}px`;

    let newScale;
    if (gameRatio > windowRatio) {
        newScale = window.innerWidth / container.offsetWidth;
        if (newScale > 1) newScale = 1;
    }
    else {
        newScale = window.innerHeight / container.offsetHeight;
        if (newScale > 1) newScale = 1;
    }
    container.style.transform = `scale(${newScale})`;
}



