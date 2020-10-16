
// A block with coordinates (x,y), a color and a size
class Block {
    constructor(x, y, color, size) {
      this.x = x,
        this.y = y,
        this.color = color,
        this.size = size;
    }

    getMovedDown(){
        return new Block(this.x,
            this.y + this.size,
            this.color,
            this.size);
    }

    getMovedSide(dir){
        return new Block(this.x + this.size * dir,
            this.y,
            this.color,
            this.size);
    }

    moveDown(){
        this.y += this.size;
    }

    moveSide(dir){
        this.x += this.size * dir;
    }
  }


  