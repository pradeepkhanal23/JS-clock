const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

function clock() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the clock elements
  drawClock();

  // Request the next animation frame
  requestAnimationFrame(clock);
}

function drawClock() {
  ctx.save();

  // Setting up canvas
  ctx.translate(centerX, centerY);
  ctx.rotate(-Math.PI / 2);

  // Update colors and styles for the neumorphism style
  ctx.fillStyle = "#0b1a21"; // Dark background color
  ctx.shadowBlur = 0; // Disable the default shadow

  // Clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, centerX - 10, 0, Math.PI * 2, true); // Outer circle
  ctx.fillStyle = "#0b1a21"; // Dark background color
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "#071015"; // Dark shadow color
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, centerX - 10, 0, Math.PI * 2, true); // Outer circle
  ctx.fillStyle = "#0b1a21"; // Dark background color
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#0f242d"; // Light shadow color
  ctx.fill();
  ctx.restore();

  // Drawing hour marks
  ctx.save();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#6f6e75"; // Dark background color for the marks
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(centerX - 30, 0);
    ctx.lineTo(centerX - 10, 0);
    ctx.stroke();
  }

  ctx.restore();

  // Drawing minute marks
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#0b1a21"; // Dark background color for the marks
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(centerX - 17, 0);
      ctx.lineTo(centerX - 10, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Getting current time
  const now = new Date();
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Drawing clock hands
  drawHourHand(hour, min);
  drawMinuteHand(min, sec);
  drawSecondHand(sec);

  ctx.restore(); // Restore the initial state of the context
}

function drawHourHand(hr, min) {
  ctx.save();
  const hourAngle = (Math.PI / 6) * hr + (Math.PI / 360) * min;
  ctx.rotate(hourAngle);
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#fd115d"; // Dark background color for the hand
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(70, 0);
  ctx.stroke();
  ctx.restore();
}

function drawMinuteHand(min, sec) {
  ctx.save();
  const minAngle = (Math.PI / 30) * min + (Math.PI / 1800) * sec;
  ctx.rotate(minAngle);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#276c9f"; // Dark background color for the hand
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(160, 0);
  ctx.stroke();
  ctx.restore();
}

function drawSecondHand(sec) {
  ctx.save();
  const secondAngle = (sec * Math.PI) / 30;
  ctx.rotate(secondAngle);
  ctx.lineWidth = 7;
  ctx.strokeStyle = "white"; // Dark background color for the hand
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(165, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "white"; // Dark background color for the center of the second hand
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
}

// Start the clock animation
requestAnimationFrame(clock);
