const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const now = new Date();

function clock() {
  //first drawing the clock main face

  ctx.save(); // main clock save

  //Setting Up canvas
  ctx.clearRect(0, 0, 500, 500);
  /*canvas by default starts at  (x,y)=(0,0) top left corner , but in this case we want it in the center so we translated the value+250 in both direction to get the center at (0,0) in a circle*/
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "coral"; // stroke color setup
  ctx.fillStyle = "#f5f5f5"; // inside the circle color
  ctx.lineWidth = 3; // stroke width
  ctx.lineCap = "round"; //rounded line at the edges

  // clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.arc(0, 0, 240, 0, Math.PI * 2, true); // Outer circle
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //drawing hour marks
  ctx.save();
  ctx.lineWidth = 8;

  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(220, 0);
    ctx.lineTo(240, 0);
    ctx.stroke();
  }
  ctx.restore();

  //drawing min marks
  ctx.save();
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

  ctx.restore();

  //getting current time
  ctx.save();
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  console.log(`${hour % 12}:${min}:${sec}`);

  //HOUR HAND
  ctx.save();
  const hourAngle = (Math.PI / 6) * hour + (Math.PI / 360) * min;
  ctx.rotate(hourAngle);
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(70, 0);
  ctx.stroke();
  ctx.restore();

  //MINUTE HAND
  ctx.save();
  const minAngle = (Math.PI / 30) * min + (Math.PI / 1800) * sec;
  ctx.rotate(minAngle);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "skyblue";
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(160, 0);
  ctx.stroke();
  ctx.restore();

  //SECONDS HAND
  ctx.save();
  const secondAngle = (sec * Math.PI) / 30;
  ctx.rotate(secondAngle);
  ctx.lineWidth = 7;
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(165, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); //main clock restore
}

clock();
