const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;
let radius;

//DOM elements
const form = document.getElementById("clock-styles");
const bgColor = document.getElementById("background-color");
const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const hourMinMarkColor = document.getElementById("hour-min-mark-color");
const hourHandColor = document.getElementById("hour-hand-color");
const minuteHandColor = document.getElementById("minute-hand-color");
const secondHandColor = document.getElementById("second-hand-color");
document.body.style.backgroundColor = bgColor.value;
const saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataUrl;
  link.click();
});

bgColor.addEventListener("input", (e) => {
  document.body.style.backgroundColor = e.target.value;
});
faceColor.addEventListener("input", (e) => {
  faceColor.style.color = e.target.value;
});
borderColor.addEventListener("input", (e) => {
  borderColor.style.color = e.target.value;
});
hourMinMarkColor.addEventListener("input", (e) => {
  hourMinMarkColor.style.color = e.target.value;
});
hourHandColor.addEventListener("input", (e) => {
  hourHandColor.style.color = e.target.value;
});
minuteHandColor.addEventListener("input", (e) => {
  minuteHandColor.style.color = e.target.value;
});
secondHandColor.addEventListener("input", (e) => {
  secondHandColor.style.color = e.target.value;
});

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

  // Updating colors and styles for the clock
  ctx.strokeStyle = borderColor.value;
  ctx.lineWidth = 4;
  ctx.fillStyle = faceColor.value; // Dark background color

  // Clock face/border
  ctx.save();
  ctx.beginPath();
  radius = centerX - 30;
  ctx.arc(0, 0, radius, 0, Math.PI * 2, true); // Outer circle
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Drawing hour marks
  ctx.save();
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.strokeStyle = hourMinMarkColor.value; // Dark background color for the hour marks

  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    const hourMarkStartPoint = centerX - 70;
    ctx.moveTo(hourMarkStartPoint, 0);
    ctx.lineTo(hourMarkStartPoint + 17, 0);
    ctx.rotate(Math.PI / 6);
    ctx.stroke();
  }

  ctx.restore();

  // Drawing minute marks
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = hourMinMarkColor.value; // Dark background color for the minutes marks

  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      const minMarkStartPoint = centerX - 70;
      ctx.moveTo(minMarkStartPoint, 0);
      ctx.lineTo(minMarkStartPoint + 7, 0);
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
  ctx.lineWidth = 15;
  ctx.lineCap = "round";
  ctx.strokeStyle = hourHandColor.value; // Dark background color for the hand
  ctx.beginPath();
  const hourArmLength = radius - 130;
  ctx.moveTo(-10, 0);
  ctx.lineTo(hourArmLength, 0);
  ctx.stroke();
  ctx.restore();
}

function drawMinuteHand(min, sec) {
  ctx.save();
  const minAngle = (Math.PI / 30) * min + (Math.PI / 1800) * sec;
  ctx.rotate(minAngle);
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.strokeStyle = minuteHandColor.value; // Dark background color for the hand
  ctx.beginPath();
  const minArmLength = radius - 90;
  ctx.moveTo(-28, 0);
  ctx.lineTo(minArmLength, 0);
  ctx.stroke();
  ctx.restore();
}

function drawSecondHand(sec) {
  ctx.save();
  const secondAngle = (sec * Math.PI) / 30;
  ctx.rotate(secondAngle);
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = secondHandColor.value; // Dark background color for the hand
  ctx.beginPath();
  const secondArmLength = radius - 70;
  ctx.moveTo(-30, 0);
  ctx.lineTo(secondArmLength, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = secondHandColor.value; // Dark background color for the center of the second hand
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
}

// Start the clock animation
requestAnimationFrame(clock);
