// A version of the game TETRIS written in TypeScript
// Written using object-oriented programming concepts,


const gridX = 10;
const gridY = 20;

const xOffset = 50;
const yOffset = 50;

const blockSize = 30;
const gridWidthRaw = gridX * blockSize;
const gridHeightRaw = gridY * blockSize;

const gridHeight = gridHeightRaw + yOffset;
const gridWidth = gridWidthRaw + xOffset;

const canvas = document.getElementById("canvas");
canvas.width = xOffset * 4 + gridWidthRaw;
canvas.height = yOffset * 2 + gridHeightRaw;
const ctx = canvas.getContext("2d");


 
const speed = 15;

// Entry into the game

let GAME = new Game(speed);

let playing = true;


// User Input

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(key) {

  if (key.keyCode == 81) {//space pause
    playing = !playing
  }

  if (key.keyCode == 82) {
    // r reset
    GAME = new Game(speed);
  }

  if (!playing) return;

  if (key.keyCode == 65) { // switch?
    // a   left
    GAME.activeTetrino.moveSide(-1, GAME.fallenBlocks);
  }
  else if (key.keyCode == 68) {
    // d  right
    GAME.activeTetrino.moveSide(1, GAME.fallenBlocks);

  }
  else if (key.keyCode == 87) {
    // w  rotation
    GAME.activeTetrino.rotate(GAME.fallenBlocks);
  }
  else if (key.keyCode == 83) {
    // s  down
  }
  else if (key.keyCode == 70) {
    // f  store
    GAME.storeBlock();
  }
  else if (key.keyCode == 32) {
    // space smash
    GAME.activeTetrino.smashDown(GAME.fallenBlocks);
  }



}



// Game Loop

window.main = function () {
  window.requestAnimationFrame(main);

  if (playing) {
    // Whatever your main loop needs to do
    GAME.tick();
    drawWorldState(GAME);
    playing = !GAME.gameOver;
    //print(WORLD.activeTetrino.pX)
  }
};

main(); // Start the cycle









