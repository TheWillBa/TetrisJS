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

const canvas = document.getElementById("canvas");
canvas.width = xOffset*2 + gridWidthRaw;
canvas.height = yOffset*2 + gridHeightRaw;
const ctx = canvas.getContext("2d");



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

const TempT = new TetrinoTemplate([1, 5, 4, 6],  1.5, 1.5, "purple");
const TempI = new TetrinoTemplate([0, 4, 8, 12], 0.5, 1.5, "lightblue");
const TempJ = new TetrinoTemplate([0, 5, 4, 6],  1.5, 1.5, "blue");
const TempL = new TetrinoTemplate([4, 2, 5, 6],  1.5, 1.5, "orange");
const TempO = new TetrinoTemplate([1, 5, 4, 0],    1,   1, "yellow");
const TempS = new TetrinoTemplate([1, 5, 4, 2],  1.5, 1.5, "green");
const TempZ = new TetrinoTemplate([1, 5, 6, 0],  1.5, 1.5, "red");

const templates = [TempT, TempI, TempJ, TempL, TempL, TempO, TempS, TempZ]

// TetrinoTemplate Natural -> Tetrino
// produces a tetrino based on the template at a given location

function createTetrino(temp, location){

  let remainder = (n,v) => n-v*Math.floor(n/v);
  let quotient =  (n,v) => Math.floor(n/v);

  let positionToBlock = n => new Block(location + blockSize * remainder(n,4),
                                        location + blockSize * quotient(n,4),
                                        temp.color,
                                        blockSize)


  let generateTemplateBlocks = lob => lob.map(positionToBlock);

  return new Tetrino(generateTemplateBlocks(temp.locations),
                     location + temp.pX * blockSize,
                     location + temp.pY * blockSize)
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

let blocks1 = [new Block(xOffset+blockSize, yOffset, "purple", blockSize),
                new Block(xOffset+blockSize, yOffset+blockSize, "purple", blockSize),
                new Block(xOffset, yOffset+blockSize, "purple", blockSize),
                new Block(xOffset+blockSize*2, yOffset+blockSize, "purple", blockSize)];

let t1 = new Tetrino(blocks1, xOffset + blockSize + blockSize/2, yOffset + blockSize + blockSize/2);

let WORLD = new WorldState(t1, [], 10, 10, 0);
// Use and modify a global world variable to assure that input modifications are not missed
let playing = true;




window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(key){
  if(key.keyCode == 65){ // switch?
    // a   left
    if(tetrinoCanMoveSide(WORLD.activeTetrino, -1, WORLD.fallenBlocks) && playing){
      WORLD.activeTetrino = moveTetrinoSide(WORLD.activeTetrino, -1);
    }
  }
  else if(key.keyCode == 68){
    // d  right
    if(tetrinoCanMoveSide(WORLD.activeTetrino, 1, WORLD.fallenBlocks) && playing){
      WORLD.activeTetrino = moveTetrinoSide(WORLD.activeTetrino, 1);
    }
  }
  else if(key.keyCode == 87){
    // w  rotation
    if(tetrinoCanRotate(WORLD.activeTetrino, WORLD.fallenBlocks) && playing){
      WORLD.activeTetrino = rotateTetrino(WORLD.activeTetrino);
    }
  }
  else if(key.keyCode == 83){
    // s  down
  }
  else if(key.keyCode == 32){//space pause
     playing = !playing
  }
}


window.main = function () {
  window.requestAnimationFrame( main );
  
  if(playing)
    {
  // Whatever your main loop needs to do
      WORLD = nextWorldState(WORLD)
  
      drawWorldState(WORLD)
  //print(WORLD.activeTetrino.pX)
   }
};

main(); // Start the cycle




// WorldState -> WorldState
// produces the next world state, pure

function nextWorldState(ws){
  if(ws.currentTime <= 0){
    if(tetrinoCanMoveDown(ws.activeTetrino, ws.fallenBlocks)){
      return new WorldState(nextTetrino(ws.activeTetrino), // get next block
                            ws.fallenBlocks, 
                            ws.fallTimer, 
                            ws.fallTimer, // reset current time
                            ws.points);                     
    }
    else{
      return new WorldState(getNewTetrino(xOffset),
                            ws.fallenBlocks.concat(ws.activeTetrino.blocks),
                            ws.fallTimer,
                            ws.fallTimer,
                            ws.points); // check for line clear

    }
  }
  else { // block cannot move because of timer
      return new WorldState(ws.activeTetrino,
                            ws.fallenBlocks,
                            ws.fallTimer,
                            ws.currentTime - 1,
                            ws.points);

  }
}


// Tetrino (listof Block)-> Boolean
// produces true if the tetrino can move down

function tetrinoCanMoveDown(t, lob){
  let blocksBelow = b => ormap(
    (b_) => b_.x == nextBlock(b).x && b_.y == nextBlock(b).y, lob);

  let groundBelow = b => nextBlock(b).y >= gridHeight;

  return !(ormap(groundBelow, t.blocks) || ormap(blocksBelow, t.blocks))
}



// returns true if applying func to any element in arr returns true
function ormap(func, arr){
  for(e of arr){
    if(func(e)) { return true;}
  }
  return false
}


// Tetrino -> Tetrino
// produces the next tetrino

function nextTetrino(t){
  return new Tetrino(t.blocks.map(nextBlock),
                      t.pX,
                      t.pY + blockSize);
}


// Block -> Block
// produces the next block

function nextBlock(b){
  return new Block(b.x,
                    b.y + b.size,
                    b.color,
                    b.size);
}


// Natural -> Tetrino
// produces a random tetrino at location given

function getNewTetrino(location){
  return createTetrino(templates[Math.floor(Math.random() * templates.length)],location)
}



// Tetrino 1|-1 (listof Block) ->  Boolean
// produces true if the tetrino can move left (-1) or right (1)

function tetrinoCanMoveSide(t, dir, lob){
  let blocksOn = b => ormap(
    (b_) => b_.x == b.x && b_.y == b.y, lob);

  let inWall = b => (b.x < xOffset) || (b.x >= gridWidth);

  return !(ormap(inWall, moveTetrinoSide(t, dir).blocks) || ormap(blocksOn, moveTetrinoSide(t, dir).blocks))
}

// Tetrino 1|-1 -> Tetrnio
// Move the tetrnio left (-1) or right (1)

function moveTetrinoSide(t, dir){
  let shiftBlock = b => new Block(b.x+b.size*dir, b.y, b.color, b.size);
  return new Tetrino (t.blocks.map(shiftBlock), t.pX + blockSize*dir, t.pY);
}


// Tetrino (listof Block) -> Boolean
// returns true if the tetrino can rotate

function tetrinoCanRotate(t, lob){
  let blocksOn = b => ormap(
    (b_) => b_.x == b.x && b_.y == b.y, lob);

  let outOfBounds = b => (b.x < xOffset) || (b.x >= gridWidth) || b.y < yOffset || b.y >= gridHeight;

  return !(ormap(outOfBounds, rotateTetrino(t).blocks) || ormap(blocksOn, rotateTetrino(t).blocks))
}


// Tetrino -> Tetrino
// produces a new tetrino rotated 90 deg
function rotateTetrino(t){
  let rotate = b => new Block((-1*(b.y - t.pY) + t.pX) - b.size,
                               t.pY + ( b.x-t.pX), 
                               b.color, 
                               b.size);


  return new Tetrino (t.blocks.map(rotate), t.pX, t.pY);
}

//#region Handle drawing



// Draws a block on the canvas, impure function

function drawBlock(b){
  ctx.beginPath();
  ctx.fillStyle = b.color;
  ctx.strokeStyle = "black";
  ctx.rect(b.x, b.y, b.size, b.size);
  ctx.fill();  
  ctx.stroke();
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

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();  

  drawGrid();
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

//#endregion

