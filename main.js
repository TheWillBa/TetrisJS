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


 


// Entry into the game

const GAME = new Game(10);

let playing = true;


// User Input

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(key) {

  if (key.keyCode == 32) {//space pause
    playing = !playing
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

}



// Game Loop

window.main = function () {
  window.requestAnimationFrame(main);

  if (playing) {
    // Whatever your main loop needs to do
    GAME.tick();
    drawWorldState(GAME);
    //print(WORLD.activeTetrino.pX)
  }
};

main(); // Start the cycle









