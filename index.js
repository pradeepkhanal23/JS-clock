const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const now = new Date();

function clock() {
  //first drawing the clock main face
  setupCanvas();
  drawClockFace();
  drawHourMarks();
  drawMinutesMarks();
  getCurrentTimeStamps();
}

function setupCanvas() {
  /*canvas by default starts at  (x,y)=(0,0) top left corner , but in this case we want it in the center so we translated the value+250 in both direction to get the center at (0,0) in a circle*/
  ctx.translate(250, 250);

  ctx.strokeStyle = "coral"; // stroke color setup
  ctx.fillStyle = "#f5f5f5"; // inside the circle color
  ctx.lineWidth = 3; // stroke width
  ctx.lineCap = "round"; //rounded line at the edges
}

function drawClockFace() {
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.arc(0, 0, 240, 0, Math.PI * 2, true); // Outer circle

  ctx.stroke();
  ctx.fill();
}

function drawHourMarks() {
  ctx.lineWidth = 8;

  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(220, 0);
    ctx.lineTo(240, 0);
    ctx.stroke();
  }
}

function drawMinutesMarks() {
  ctx.lineWidth = 4;

  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(233, 0);
      ctx.lineTo(240, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
}

function getCurrentTimeStamps() {
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const seconds = now.getSeconds();

  console.log(`${hour % 12}:${min}:${seconds}`);
}

clock();
