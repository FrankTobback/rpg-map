import context from "./main.js";


const SCALE = 0.7;
const WIDTH = 32;
const HEIGHT = 48;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 2, 3];
const FACING_DOWN = 0;
const FACING_UP = 3;
const FACING_LEFT = 1;
const FACING_RIGHT = 2;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 1;

let canvas = document.getElementById("main");
canvas.width = 16 * 32
canvas.height = 16 * 32
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;
let img = new Image();

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
  img.src = 'images/assassin.png';
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

loadImage();

function gameLoop() {  
    ctx.drawImage(context, 0, 0)
  let hasMoved = false;

  if (keyPresses.ArrowUp) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.ArrowDown) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  if (keyPresses.ArrowLeft) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.ArrowRight) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (!hasMoved){
      currentLoopIndex = 0;
  }
  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  window.requestAnimationFrame(gameLoop);
}


// Collision

function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
        positionX += deltaX;
      }
    if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
        positionY += deltaY;
      }
    currentDirection = direction;
}
















// Draw character frames 
// function init() {
//     requestAnimationFrame(step);
//     drawFrame(0, 0, 0, 0);
//     drawFrame(1, 0, scaledWidth, 0);
//     drawFrame(0, 0, scaledWidth * 2, 0);
//     drawFrame(3, 0, scaledWidth * 3, 0);
// }


// // Animation sequence

// function step() {
//     frameCount++;
//     if (frameCount < 15) {
//         requestAnimationFrame(step);
//         return;
//     }
//     frameCount = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(cycleLoop[currentLoopIndex], currentDirection, 0, 0);
//     currentLoopIndex++;
//     if (currentLoopIndex >= cycleLoop.length) {
//         currentLoopIndex = 0;
//         currentDirection++;
//     }

//     if (currentDirection >= 4) {
//         currentDirection = 0;
//     }
//     requestAnimationFrame(step);
// }