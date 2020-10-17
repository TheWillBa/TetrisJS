class TetrinoTemplate {
    constructor(locations, pX, pY, color) {
        this.locations = locations,
            this.pX = pX,
            this.color = color,
            this.pY = pY;
    }
}

// 00 01 02 03
// 04 05 06 07
// 08 09 10 11
// 12 13 14 15

const TempT = new TetrinoTemplate([1, 5, 4, 6], 1.5, 1.5, "purple");
const TempI = new TetrinoTemplate([0, 4, 8, 12], 0.5, 1.5, "lightblue");
const TempJ = new TetrinoTemplate([0, 5, 4, 6], 1.5, 1.5, "blue");
const TempL = new TetrinoTemplate([4, 2, 5, 6], 1.5, 1.5, "orange");
const TempO = new TetrinoTemplate([1, 5, 4, 0], 1, 1, "yellow");
const TempS = new TetrinoTemplate([1, 5, 4, 2], 1.5, 1.5, "green");
const TempZ = new TetrinoTemplate([1, 5, 6, 0], 1.5, 1.5, "red");

const templates = [TempT, TempI, TempJ, TempL, TempL, TempO, TempS, TempZ]

// TetrinoTemplate Natural -> Tetrino
// produces a tetrino based on the template at a given location

function createTetrino(temp, x, y) {

    let remainder = (n, v) => n - v * Math.floor(n / v);
    let quotient = (n, v) => Math.floor(n / v);

    let positionToBlock = n => new Block(x + blockSize * remainder(n, 4),
        y + blockSize * quotient(n, 4),
        temp.color,
        blockSize)


    let generateTemplateBlocks = lob => lob.map(positionToBlock);

    return new Tetrino(generateTemplateBlocks(temp.locations),
        x + temp.pX * blockSize,
        y + temp.pY * blockSize,
        temp)
}


function getNewTetrino(x, y) {
    return createTetrino(templates[Math.floor(Math.random() * templates.length)], x, y)
}
