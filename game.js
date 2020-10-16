const linesToLevel = 10;
const points = [40, 100, 300, 1200] 


class Game {
    constructor(fallTimer) {
      this.activeTetrino = getNewTetrino(xOffset + gridWidthRaw / 2, yOffset),
        this.fallenBlocks = [],
        this.fallTimer = fallTimer,
        this.currentTime = fallTimer,
        this.points = 0,
        this.linesCleared = 0
        this.upcomingTetrino = getNewTetrino(xOffset + gridWidthRaw / 2, yOffset);
    }

    level(){
        return Math.floor(this.linesCleared / linesToLevel);
    }
  
    resetFallTimer() {
      this.currentTime = this.fallTimer;
    }
  
    decrementFallTimer() {
      this.currentTime--;
    }
  
    resetActiveBlock() {
      this.fallenBlocks = this.fallenBlocks.concat(this.activeTetrino.blocks);
      this.activeTetrino = this.upcomingTetrino;
      this.upcomingTetrino = getNewTetrino(xOffset + gridWidthRaw / 2, yOffset)
    }

    addPoints(){
        this.points += points[this.numFullLines()-1] * (this.level() + 1)
        console.log(this.points);
    }

    numFullLines(){
        let count = 0;
        for(let i = yOffset; i < gridHeight; i+=blockSize){
            if(this.fallenBlocks.filter(b => (b.y == i)).length == gridX) count++;
        }

        return count;
    }

    clearLines(){
        for(let i = yOffset; i < gridHeight; i+=blockSize){
            let row = this.fallenBlocks.filter(b => (b.y == i));
            if(row.length == gridX){
               // Remove blocks
               for(b of row){
                const index = this.fallenBlocks.indexOf(b);
                this.fallenBlocks.splice(index,1);
               }
               
               // Move all above down one
               let toMoveDown = this.fallenBlocks.filter(b => (b.y < i))
               for(b of toMoveDown){
                   b.moveDown();
               }
            }
        }
    }
  
    tick() {
      if (this.currentTime <= 0) {
        this.activeTetrino.tick(this)
        if (this.activeTetrino.isDead) {
          this.resetActiveBlock();

          if(this.numFullLines() > 0){
            this.addPoints();
            this.clearLines();
          }

        }
        this.resetFallTimer();
      }
      else { // block cannot move because of timer
        this.decrementFallTimer()
      }
    }
  }