class Tetrino {
    constructor(blocks, pX, pY, temp) {
        this.pX = pX,
            this.blocks = blocks,
            this.pY = pY,
            this.isDead = false;
            this.template = temp;
    }
    

    tick(game) {
        if (this.canMoveDown(game.fallenBlocks) && !this.isDead) {
            this.moveDown();
        }
        else {
            this.isDead = true;
        }
    }

    canMoveDown(lob) {
        return can(this.getMovedDown().blocks, lob);
    }

    getMovedDown() {
        return new Tetrino(this.blocks.map(b => b.getMovedDown()),
            this.pX,
            this.pY + blockSize,
            this.template)
    }

    moveDown() {
        let moved = this.getMovedDown();
        this.blocks = moved.blocks;
        this.pY = moved.pY;
    }


    canMoveSide(dir, lob) {
        return can(this.getMovedSide(dir).blocks, lob);
    }


    getMovedSide(dir) {

        return new Tetrino(this.blocks.map(b => b.getMovedSide(dir)), this.pX + blockSize * dir, this.pY,
        this.template);
    }

    moveSide(dir, lob) {
        if (!this.canMoveSide(dir, lob)) { return; }
        let moved = this.getMovedSide(dir);
        this.pX = moved.pX;
        this.blocks = moved.blocks;
    }

    getRotatedTetrino() {
        let rotate = b => new Block((-1 * (b.y - this.pY) + this.pX) - b.size,
            this.pY + (b.x - this.pX),
            b.color,
            b.size);


        return new Tetrino(this.blocks.map(rotate), this.pX, this.pY,
        this.template);
    }

    canRotate(fallen) {
        return can(this.getRotatedTetrino().blocks, fallen);
    }

    rotate(fallen) {
        if (!this.canRotate(fallen)) { return; };
        let rotated = this.getRotatedTetrino();
        this.blocks = rotated.blocks;
    }
}


// (listof Block) -> Boolean
// Abstract function for checking if the given list if blocks is valid on the fallen blocks

function can(next, fallen) {
    let blocksOn = b => ormap(
        (b_) => b_.x == b.x && b_.y == b.y, fallen);

    let outOfBounds = b => (b.x < xOffset) || (b.x >= gridWidth) || b.y < yOffset || b.y >= gridHeight;

    return !(ormap(outOfBounds, next) || ormap(blocksOn, next))
}




// returns true if applying func to any element in arr returns true
function ormap(func, arr) {
    for (e of arr) {
        if (func(e)) { return true; }
    }
    return false
}
