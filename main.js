// A version of the game TETRIS written in TypeScript
// Written using object-oriented programming concepts,


const gridX = 10;
const gridY = 20;

const xOffset = 50;
const yOffset = 50;

const blockSize = 30;
const gridWidthRaw = gridX * blockSize;
const gridHeightRaw = gridY * blockSize;

const gridWidth = gridWidthRaw + xOffset;
const gridHeight = gridHeightRaw + yOffset;

const canvas = document.getElementById("canvas");
canvas.width = xOffset * 2 + gridWidthRaw;
canvas.height = yOffset * 2 + gridHeightRaw;
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.font = "30px Arial";
ctx.fillText("hello", xOffset + gridWidthRaw/2, yOffset/2);






// Entry into the game

const GAME = new Game(getNewTetrino(xOffset + gridWidthRaw / 2, yOffset), [], 10, 10, 0);
// Use and modify a global world variable to assure that input modifications are not missed
let playing = true;


// User Input

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(key) {
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
  else if (key.keyCode == 32) {//space pause
    playing = !playing
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









