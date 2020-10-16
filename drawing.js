
// Functions for drawing to the screen

function drawBlock(b) {
    ctx.beginPath();
    ctx.fillStyle = b.color;
    ctx.strokeStyle = "black";
    ctx.rect(b.x, b.y, b.size, b.size);
    ctx.fill();
    ctx.stroke();
  }
  
  
  function drawTetrino(t) {
    drawListOfBlocks(t.blocks);
  }
  
  
  function drawListOfBlocks(lob) {
    for (b of lob) {
      drawBlock(b);
    }
  }

  function drawTetrinoPreview(ws){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(gridWidth + xOffset/2, yOffset, 3.5*blockSize, 4.5*blockSize );
    ctx.stroke();

    let tetrinoToDraw = createTetrino(ws.upcomingTetrino.template, blockSize * 0.25 + gridWidth + xOffset/2,  blockSize * 0.25 + yOffset);
    drawTetrino(tetrinoToDraw);
  }
  
  
  function drawWorldState(ws) {
  
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

   
  
    drawGrid();
    let blocks = ws.fallenBlocks.concat(ws.activeTetrino.blocks);
    drawListOfBlocks(blocks);
    drawGrid();

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(ws.points,xOffset + gridWidthRaw/2, yOffset/1.5);


    drawTetrinoPreview(ws);
  }
  
  function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(xOffset, yOffset, gridWidthRaw, gridHeightRaw);
    ctx.stroke();
  }
  