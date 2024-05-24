var color = ['#ca7', '#7ac', '#77c', '#aac', '#a7c', '#ac7', "#caa"];
var label = ['jackpot', '200', 'Zonk', '100', 'Zonk', '500', 'Zonk'];
var slices = color.length;
var sliceDeg = 360 / slices;
var deg = 0;
var speed = 5;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var center;
var radius;
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

var isSpinning = false;
var spinCount = 0;

function resizeCanvas() {
  var size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);
  canvas.width = size;
  canvas.height = size;
  center = canvas.width / 2;
  radius = center - 10;
  drawImg();
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function drawSlice(index, deg, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, deg2rad(deg), deg2rad(deg + sliceDeg), false);
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg + sliceDeg / 2));
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = '16px Arial';
  ctx.fillText(text, radius - 10, 10);
  ctx.restore();
}

function drawArrow() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(center - 10, 0);
  ctx.lineTo(center + 10, 0);
  ctx.lineTo(center, 20);
  ctx.closePath();
  ctx.fill();
}

function drawImg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < slices; i++) {
    drawSlice(i, deg + i * sliceDeg, color[i]);
    drawText(deg + i * sliceDeg, label[i]);
  }
  drawArrow();
}

function anim() {
  deg += speed;
  deg %= 360;

  if (isSpinning) {
    speed *= 0.99; // Deceleration rate
    if (speed < 0.1) {
      speed = 0;

      let arrowSlice = Math.floor((360 - deg - 90) / sliceDeg) % slices;
      arrowSlice = (slices + arrowSlice) % slices;

      let spinResult = Math.floor((360 - deg - 90 + sliceDeg / 2) / sliceDeg) % slices;
      spinResult = (slices + spinResult) % slices;

      if (label[spinResult] !== 'Zonk') {
        let distanceToNextZonk = findDistanceToNextZonk(spinResult);
        adjustSpeedAndRotation(distanceToNextZonk);
        return;
      }

      spinCount++;
      console.log(`Spin count: ${spinCount}`);
      isSpinning = false; // Set spinning to false after the spin finishes
      return;
    }
  }

  drawImg();
  window.requestAnimationFrame(anim);
}

function start() {
  if (!isSpinning) {
    isSpinning = true;
    anim();
    setTimeout(() => {
      isSpinning = false;
    }, 3000); // Set spinning to false after 3 seconds
  }
}

function findDistanceToNextZonk(currentSliceIndex) {
  let zonkIndex = label.indexOf('Zonk');
  let distance = (zonkIndex - currentSliceIndex + slices) % slices;
  return distance;
}

function adjustSpeedAndRotation(distanceToNextZonk) {
  let targetSpeed = 0.1;
  while (speed > targetSpeed && distanceToNextZonk > 0) {
    deg += speed;
    deg %= 360;
    speed *= 0.98; // Deceleration rate
    distanceToNextZonk--;
  }
}

document.getElementById('startButton').addEventListener('click', start);

drawImg();
