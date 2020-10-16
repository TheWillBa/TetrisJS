class Game {
    constructor(activeTetrino, fallenBlocks, fallTimer, currentTime, points) {
      this.activeTetrino = activeTetrino,
        this.fallenBlocks = fallenBlocks,
        this.fallTimer = fallTimer,
        this.currentTime = currentTime,
        this.points = points
    }
  
    resetFallTimer() {
      this.currentTime = this.fallTimer;
    }
  
    decrementFallTimer() {
      this.currentTime--;
    }
  
    resetActiveBlock() {
      this.fallenBlocks = this.fallenBlocks.concat(this.activeTetrino.blocks);
      this.activeTetrino = getNewTetrino(xOffset + gridWidthRaw / 2, yOffset);
    }
  
    tick() {
      if (this.currentTime <= 0) {
        this.activeTetrino.tick(this)
        if (this.activeTetrino.isDead) {
          this.resetActiveBlock();
        }
        this.resetFallTimer();
      }
      else { // block cannot move because of timer
        this.decrementFallTimer()
      }
    }
  }