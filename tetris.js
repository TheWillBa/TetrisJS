// A version of the game TETRIS written in TypeScript
// Written using function programming concepts,
// design is from version previously written in LISP-style language Racket



const gridX = 10;
const gridY = 20;

const xOffset = 50;
const yOffset = 50;

const blockSize = 30;
const gridWidthRaw = gridX * blockSize;
const gridHeightRaw = gridY * blockSize;

const gridWidth = gridWidthRaw + xOffset;
const gridHeight = gridHeightRaw + yOffset;


// A block with coordinates (x,y), a color and a size
class Block {
  constructor(x, y, color, size) {
    this.x = x,
      this.y = y,
      this.color = color,
      this.size = size;
  }
}

let b1 = new Block(50, 50, "red", 10);
let b2 = new Block(200, 100, "purple", 10);

class TetrinoTemplate {
  constructor(locations, pX, pY, color) {
    this.locations = locations,
      this.pX = pX,
      this.color = color,
      this.pY = pY;
  }
}

class Tetrino {
  constructor(blocks, pX, pY) {
      this.pX = pX,
      this.blocks = blocks,
      this.pY = pY;
  }
}


class WorldState {
  constructor(activeTetrino, fallenBlocks, fallTimer, currentTime, points) {
      this.activeTetrino = activeTetrino,
      this.fallenBlocks = fallenBlocks,
      this.fallTimer = fallTimer,
      this.currentTime = currentTime,
      this.points = points
  }
}


// Entry into the game

let blocks1 = [new Block(blockSize*5, blockSize*5, "purple", blockSize),
                new Block(blockSize*6, blockSize*5, "purple", blockSize),
                new Block(blockSize*7, blockSize*5, "purple", blockSize),
                new Block(blockSize*6, blockSize*4, "purple", blockSize)];

let t1 = new Tetrino(blocks1, 65, 40);

let WORLD = new WorldState(t1, [], 10, 10, 0);
// Use and modify a global world variable to assure that input modifications are not missed
let playing = true;

function play(){
  while(playing){
    WORLD = nextWorldState(WORLD)
    drawWorldState(WORLD)
    
    // handle use input?
  }
}

// Handle drawing

const canvas = document.getElementById("canvas");
canvas.width = xOffset*2 + gridWidthRaw;
canvas.height = yOffset*2 + gridHeightRaw;
const ctx = canvas.getContext("2d");


// Draws a block on the canvas, impure function

function drawBlock(b){
  ctx.beginPath();
  ctx.fillStyle = b.color;
  ctx.rect(b.x, b.y, b.size, b.size);
  ctx.fill();  
}
//drawBlock(b1);
//drawBlock(b2);

// Draws a tetrino on the canvas, impure function
// Essentially wraps drawlob, necessary?

function drawTetrino(t){
  drawListOfBlocks(t.blocks);
}
//drawTetrino(t1);

function drawListOfBlocks(lob){
  for(b of lob){
    drawBlock(b);
  }
}

// Draws the worldstate, so it handles the grid and the blocks

function drawWorldState(ws){
  let blocks = ws.fallenBlocks.concat(ws.activeTetrino.blocks);
  drawListOfBlocks(blocks);
  drawGrid();
}

function drawGrid(){
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.rect(xOffset, yOffset, gridWidthRaw, gridHeightRaw);
  ctx.stroke();  
}

drawWorldState(WORLD);



