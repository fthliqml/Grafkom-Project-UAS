let CANVAS = document.getElementById("myCanvas");
let ctx = CANVAS.getContext("2d");
let CanvasMiddleX = CANVAS.width / 2;
let CanvasMiddleY = CANVAS.height / 2;

// Get Input ID
const jarakDindingID = document.getElementById("jarakDinding");
const tinggiBendaID = document.getElementById("tinggiBenda");
const diameterBendaID = document.getElementById("diameterBenda");
const koefisienRestitusiID = document.getElementById("koefisienRestitusi");
const kecepatanBendaID = document.getElementById("kecepatanBenda");
const gayaBendaID = document.getElementById("gayaBenda");

// Get Text Value
let jarakDindingValText = document.getElementById("jarakDindingValue");
let tinggiBendaValText = document.getElementById("tinggiBendaValue");
let diameterBendaValText = document.getElementById("diameterBendaValue");
let koefisienRestitusiValText = document.getElementById(
  "koefisienRestitusiValue"
);
let kecepatanBendaValText = document.getElementById("kecepatanBendaValue");
let gayaBendaValText = document.getElementById("gayaBendaValue");

// Get User Input
let jarakDindingInput = Number(jarakDindingID.value);
let tinggiBendaInput = Number(tinggiBendaID.value);
let diameterBendaInput = Number(diameterBendaID.value);
let koefisienRestitusiInput = Number(koefisienRestitusiID.value);
let kecepatanBendaInput = Number(kecepatanBendaID.value);
let gayaBendaInput = Number(gayaBendaID.value);

function refresh_Text_Input() {
  jarakDindingValText.textContent = jarakDindingID.value;
  tinggiBendaValText.textContent = tinggiBendaID.value;
  diameterBendaValText.textContent = diameterBendaID.value;
  koefisienRestitusiValText.textContent = koefisienRestitusiID.value;
  kecepatanBendaValText.textContent = kecepatanBendaID.value;
  gayaBendaValText.textContent = gayaBendaID.value;
}

jarakDindingID.addEventListener("input", () => {
  jarakDindingInput = Number(jarakDindingID.value);
  refresh_Text_Input();
  refreshDraw();
});

function tinggiBendaFunc() {
  tinggiBendaInput = Number(tinggiBendaID.value);
  refresh_Text_Input();
  refreshDraw();
}

function refreshVelocity() {
  kecepatanBendaInput = Number(kecepatanBendaID.value);
  refresh_Text_Input;
}

function translationFunc() {
  refresh_Text_Input();
  refreshDraw();
}

tinggiBendaID.addEventListener("input", () => {
  tinggiBendaFunc();
});

diameterBendaID.addEventListener("input", () => {
  diameterBendaInput = Number(diameterBendaID.value);
  refresh_Text_Input();
  refreshDraw();
});

koefisienRestitusiID.addEventListener("input", () => {
  koefisienRestitusiInput = Number(koefisienRestitusiID.value);
  countingHeight();
  refresh_Text_Input();
  refreshDraw();
});

kecepatanBendaID.addEventListener("input", () => {
  kecepatanBendaInput = Number(kecepatanBendaID.value);
  refresh_Text_Input();
  refreshDraw();
});

gayaBendaID.addEventListener("input", () => {
  gayaBendaInput = Number(gayaBendaID.value);
  refresh_Text_Input();
  refreshDraw();
});

/*
Fungsi Dasar Menggambar
*/

// Drawing
function drawPixel(x, y, colour = "black") {
  if (colour == "biru") {
    ctx.fillStyle = "blue";
  } else if (colour == "merah") {
    ctx.fillStyle = "red";
  } else if (colour == "ungu") {
    ctx.fillStyle = "#FF00FF";
  } else if (colour == "hijau") {
    ctx.fillStyle = "green";
  } else if (colour == "biruTua") {
    ctx.fillStyle = "#00008B";
  } else if (colour == "unguTua") {
    ctx.fillStyle = "#5d2097";
  } else if (colour == "abu") {
    ctx.fillStyle = "#6a6868";
  } else if (colour == "peach") {
    ctx.fillStyle = "#fe676e";
  } else if (colour == "abuTua") {
    ctx.fillStyle = "#9e9393";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fillRect(x, y, 1.1, 1.1);
}

// Garis Solid
function garisDDA(x1, y1, x2, y2, colour) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let step = 0;

  if (Math.abs(dx) > Math.abs(dy)) {
    step = Math.abs(dx);
  } else {
    step = Math.abs(dy);
  }

  let x_inc = dx / step;
  let y_inc = dy / step;

  let x = x1;
  let y = y1;

  for (let s = 0; s < step; s += 1) {
    drawPixel(x, y, colour);
    x = x + x_inc;
    y = y + y_inc;
  }
}

// Garis Putus
function garisDash(x1, y1, x2, y2, colour) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let step = 0;
  let dash = 0;

  if (Math.abs(dx) > Math.abs(dy)) {
    step = Math.abs(dx);
  } else {
    step = Math.abs(dy);
  }

  let x_inc = dx / step;
  let y_inc = dy / step;

  let x = x1;
  let y = y1;

  for (let s = 0; s < step; s += 1) {
    if (dash < 4) {
      drawPixel(x, y, colour);
      dash += 1;
    } else if (dash == 4) {
      dash = 9;
    } else {
      dash -= 1;
      if (dash == 5) {
        dash = 0;
      }
    }
    x = x + x_inc;
    y = y + y_inc;
  }
}

// Fungsi untuk mengambil beberapa nilai dibelakang koma
function truncate(num, places) {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

function Lingkaran(xc, yc, radius, theta = 0, maxTheta = Math.PI * 2) {
  while (truncate(theta, 3) <= maxTheta) {
    let xi = xc + radius * Math.cos(theta);
    let yi = yc + radius * Math.sin(theta);
    drawPixel(xi, yi, "black");
    theta += 0.003;
  }
}

/*
Center Function
*/

// Initial Variable
let xDinding_Kiri;
let xDinding_Kanan;
let yLantai;
let xBola;
let yBola;
let xMoveBola = 0;

function dinding_lantai() {
  // Initial Variable
  xDinding_Kiri = jarakDindingInput;
  xDinding_Kanan = CANVAS.width - jarakDindingInput;
  yLantai = CanvasMiddleY * 1.993;

  // Dinding
  garisDDA(
    // Kiri
    jarakDindingInput,
    0,
    jarakDindingInput,
    yLantai + 4,
    "biruTua"
  );

  garisDDA(
    // Kanan
    CANVAS.width - jarakDindingInput,
    0,
    CANVAS.width - jarakDindingInput,
    yLantai + 4,
    "biruTua"
  );

  let dash = 0;

  // Garis Dinding
  for (let index = 0; index <= yLantai; index++) {
    if (dash < 80) {
      dash++;
    } else {
      garisDash(0, index, xDinding_Kiri, index, "biruTua");
      garisDash(xDinding_Kanan, index, CANVAS.width, index, "biruTua");
      dash = 0;
    }

    if (index == yLantai) {
      garisDash(0, index - 10, xDinding_Kiri, index - 10, "biruTua");
      garisDash(
        xDinding_Kanan,
        index - 10,
        CANVAS.width,
        index - 10,
        "biruTua"
      );
    }
  }

  // Lantai
  for (let index = 0; index < 5; index++) {
    garisDDA(xDinding_Kiri, yLantai, xDinding_Kanan, yLantai, "biruTua");
    yLantai += 1;
  }
}

function gambarBola() {
  yLantai = CanvasMiddleY * 1.993;
  xBola = jarakDindingInput + diameterBendaInput / 2 + xMoveBola;
  yBola = yLantai - diameterBendaInput / 2 - tinggiBendaInput;

  Lingkaran(xBola, yBola, diameterBendaInput / 2);
}

function refreshDraw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  gambarBola();
  dinding_lantai();
}

/*
Function for moving
*/
let goUp = false;
let goLeft = false;
const height = [];

function countingHeight() {
  height.length = 0;
  height.push(tinggiBendaInput);
  let hNew;
  let temp = tinggiBendaInput;
  while (temp != 0) {
    hNew = truncate(temp * koefisienRestitusiInput ** 2, 0);
    height.push(hNew);
    temp = hNew;
  }
}

function dropAnimation(timestamp) {
  if (!goUp) {
    let _vAkhir;
    kecepatanBendaID.value = kecepatanBendaInput + 1;
    refreshVelocity();
    tinggiBendaID.value = tinggiBendaInput - kecepatanBendaInput;
    tinggiBendaFunc();
    if (tinggiBendaInput - 1 <= 0) {
      goUp = true;
      _vAkhir = Math.sqrt(2 * height[0]);
      kecepatanBendaID.value = _vAkhir;
      refreshVelocity();
    }
    if (height.length > 0) {
      requestAnimationFrame(dropAnimation);
    }
  } else {
    tinggiBendaID.value = tinggiBendaInput + kecepatanBendaInput;
    tinggiBendaFunc();
    if (tinggiBendaInput > height[1]) {
      height.shift();
      goUp = false;
      // kecepatanBendaID.value = 0;
      // refreshVelocity();
    }
    requestAnimationFrame(dropAnimation);
  }
}

function translationAnimation(timestamp) {
  if (!goLeft) {
    xMoveBola += kecepatanBendaInput;
    translationFunc();
    if (xBola + diameterBendaInput / 2 < xDinding_Kanan) {
      requestAnimationFrame(translationAnimation);
    } else {
      goLeft = true;
      requestAnimationFrame(translationAnimation);
    }
  } else {
    xMoveBola -= kecepatanBendaInput;
    translationFunc();
    if (xBola - diameterBendaInput / 2 > xDinding_Kiri) {
      requestAnimationFrame(translationAnimation);
    } else {
      goLeft = false;
      requestAnimationFrame(translationAnimation);
    }
  }
}

function jatuhBenda() {
  countingHeight();
  kecepatanBendaID.value = 0;
  refreshVelocity();
  window.requestAnimationFrame(dropAnimation);
}

function translasiBenda() {
  window.requestAnimationFrame(translationAnimation);
}

/*
Running
*/
function init() {
  refreshDraw();
  refresh_Text_Input();
}

window.onload = init;
