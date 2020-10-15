// A version of the game TETRIS written in TypeScript
// Written using function programming concepts,
// design is from version previously written in LISP-style language Racket

//#region test pow function
function pow(x, n){
    if (n < 0) return NaN;
    if (Math.round(n) != n) return NaN;
  
    let result = 1;
  
    for (let i = 0; i < n; i++) {
      result *= x;
    }
  
    return result;
  }
//#endregion
//#region Pow test cases 



  describe("pow", function() {

    it("2 raised to power 3 is 8", function() {
      chai.assert.equal(pow(2, 3), 8);
    });
  
    it("3 raised to power 4 is 81", function() {
      chai.assert.equal(pow(3, 4), 81);
    });
  
  });
//#endregion

const gridX = 10;
const gridY = 10;

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
