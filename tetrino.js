class Tetrino {
    constructor(blocks, pX, pY) {
        this.pX = pX,
            this.blocks = blocks,
            this.pY = pY,
            this.isDead = false;
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
            this.pY + blockSize)
    }

    moveDown() {
        for (b of this.blocks) {
            b.moveDown();
        }
        this.pY += blockSize
    }


    canMoveSide(dir, lob) {
        return can(this.getMovedSide(dir).blocks, lob);
    }


    getMovedSide(dir) {

        return new Tetrino(this.blocks.map(b => b.getMovedSide(dir)), this.pX + blockSize * dir, this.pY);
    }

    moveSide(dir, lob) {
        if (!this.canMoveSide(dir, lob)) { return; }

        for (b of this.blocks) {
            b.moveSide(dir);
        }
        this.pX += blockSize * dir;
    }

    getRotatedTetrino() {
        let rotate = b => new Block((-1 * (b.y - this.pY) + this.pX) - b.size,
            this.pY + (b.x - this.pX),
            b.color,
            b.size);


        return new Tetrino(this.blocks.map(rotate), this.pX, this.pY);
    }

    canRotate(fallen) {
        return can(this.getRotatedTetrino().blocks, fallen);
    }

    rotate(fallen) {
        if (!this.canRotate(fallen)) { return; };
        let rotate = b => new Block((-1 * (b.y - this.pY) + this.pX) - b.size,
            this.pY + (b.x - this.pX),
            b.color,
            b.size);

        this.blocks = this.blocks.map(rotate);
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
