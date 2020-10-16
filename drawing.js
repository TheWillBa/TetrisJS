
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
  
  
  function drawWorldState(ws) {
  
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText(String(ws.points), xOffset + gridWidthRaw/2, yOffset/2);
  
    drawGrid();
    let blocks = ws.fallenBlocks.concat(ws.activeTetrino.blocks);
    drawListOfBlocks(blocks);
    drawGrid();
  }
  
  function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(xOffset, yOffset, gridWidthRaw, gridHeightRaw);
    ctx.stroke();
  }
  