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
const gayaGesekID = document.getElementById("gayaGesek");

// Get Text Value
let jarakDindingValText = document.getElementById("jarakDindingValue");
let tinggiBendaValText = document.getElementById("tinggiBendaValue");
let diameterBendaValText = document.getElementById("diameterBendaValue");
let koefisienRestitusiValText = document.getElementById("koefisienRestitusiValue");
let kecepatanBendaValText = document.getElementById("kecepatanBendaValue");
let gayaBendaValText = document.getElementById("gayaBendaValue");
let gayaGesekValText = document.getElementById("gayaGesekValue");

// Get User Input
let jarakDindingInput = Number(jarakDindingID.value);
let tinggiBendaInput = Number(tinggiBendaID.value);
let diameterBendaInput = Number(diameterBendaID.value);
let koefisienRestitusiInput = Number(koefisienRestitusiID.value);
let kecepatanBendaInput = Number(kecepatanBendaID.value);
let gayaBendaInput = Number(gayaBendaID.value);
let gayaGesekInput = Number(gayaGesekID.value);

function refresh_Text_Input() {
  jarakDindingValText.textContent = jarakDindingID.value;
  tinggiBendaValText.textContent = tinggiBendaID.value;
  diameterBendaValText.textContent = diameterBendaID.value;
  koefisienRestitusiValText.textContent = koefisienRestitusiID.value;
  kecepatanBendaValText.textContent = kecepatanBendaID.value;
  gayaBendaValText.textContent = gayaBendaID.value;
  gayaGesekValText.textContent = gayaGesekID.value;
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

function allRefresh() {
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
  velocityNowGLBB = gayaBendaInput;
  refresh_Text_Input();
  refreshDraw();
});

gayaGesekID.addEventListener("input", () => {
  gayaGesekInput = Number(gayaGesekID.value);
  velocityNowGLBB = gayaBendaInput;
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
  ctx.fillRect(x, y, 2, 2);
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
    theta += 0.001;
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
let thetaStart = 45;

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

function garisBola(thetaStart) {
  let thetaNow = thetaStart;
  xBola = jarakDindingInput + diameterBendaInput / 2 + xMoveBola;
  yBola = yLantai - diameterBendaInput / 2 - tinggiBendaInput;

  garisDDA(
    xBola,
    yBola,
    xBola + (diameterBendaInput / 2) * Math.cos((thetaStart * Math.PI) / 180),
    yBola + (diameterBendaInput / 2) * Math.sin((thetaStart * Math.PI) / 180),
    "merah"
  );
  for (let index = 0; index < 3; index++) {
    thetaNow += 90;
    garisDDA(
      xBola,
      yBola,
      xBola + (diameterBendaInput / 2) * Math.cos((thetaNow * Math.PI) / 180),
      yBola + (diameterBendaInput / 2) * Math.sin((thetaNow * Math.PI) / 180),
      "merah"
    );
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
  garisBola(thetaStart);
  gambarBola();
  dinding_lantai();
}

/*
Function for moving
*/
let glbIsCLicked = false;
let goUp = false;
let goLeft = false;
const height = [];

function countingHeight() {
  height.length = 0;
  let hNew;
  let temp = tinggiBendaInput;
  if (koefisienRestitusiInput < 1) {
    while (temp != 0) {
      hNew = truncate(temp * koefisienRestitusiInput ** 2, 0);
      height.push(hNew);
      temp = hNew;
    }
  } else {
    height.push(tinggiBendaInput);
  }
}

function dropAnimation(timestamp) {
  let _vAkhir;
  if (!goUp) {
    kecepatanBendaID.value = kecepatanBendaInput + 1;
    refreshVelocity();
    tinggiBendaID.value = tinggiBendaInput - kecepatanBendaInput;
    tinggiBendaFunc();
    if (tinggiBendaInput - 1 <= 0) {
      goUp = true;
      _vAkhir = Math.sqrt(2 * height[0]);
      kecepatanBendaID.value = _vAkhir;
      refreshVelocity();
      if (koefisienRestitusiInput < 1) {
        height.shift();
      }
    }
  } else {
    kecepatanBendaID.value = kecepatanBendaInput - 1;
    refreshVelocity();
    tinggiBendaID.value = tinggiBendaInput + kecepatanBendaInput;
    tinggiBendaFunc();
    if (kecepatanBendaInput == 0) {
      goUp = false;
    }
  }
  if (height.length > 0) {
    requestAnimationFrame(dropAnimation);
  }
}

function GLBAnimation(timestamp) {
  if (glbIsCLicked) {
    if (!goLeft) {
      if (xBola + diameterBendaInput / 2 < xDinding_Kanan) {
        xMoveBola += kecepatanBendaInput;
        if (xBola + diameterBendaInput / 2  + kecepatanBendaInput > xDinding_Kanan) {
          xMoveBola -= (xBola + diameterBendaInput/2 + kecepatanBendaInput) - xDinding_Kanan;
        }
        allRefresh();
        thetaStart +=
          (((kecepatanBendaInput * 1500) / (diameterBendaInput / 2)) *
            Math.PI) /
          180;
      } else {  
        goLeft = true;
      }
    } else {
      if (xBola - diameterBendaInput / 2 > xDinding_Kiri) {
        xMoveBola -= kecepatanBendaInput;
        if (xBola - diameterBendaInput / 2  - kecepatanBendaInput < xDinding_Kiri) {
          xMoveBola += xDinding_Kiri - (xBola - diameterBendaInput/2 - kecepatanBendaInput);
        }
        allRefresh();
        thetaStart -=
          (((kecepatanBendaInput * 1500) / (diameterBendaInput / 2)) *
            Math.PI) /
          180;
      } else {
        goLeft = false;
      }
    }
    requestAnimationFrame(GLBAnimation);
  }
}

let velocityNowGLBB;

function GLBBAnimation(timestamp) {
  if (!goLeft) {
    xMoveBola += velocityNowGLBB;
    velocityNowGLBB -= gayaGesekInput / 10;
    kecepatanBendaID.value = velocityNowGLBB;
    refreshVelocity();
    allRefresh();
    if (velocityNowGLBB > 0) {
      if (xBola + diameterBendaInput / 2 < xDinding_Kanan) {
        if (xBola + diameterBendaInput / 2  + kecepatanBendaInput > xDinding_Kanan) {
          xMoveBola -= (xBola + diameterBendaInput/2 + kecepatanBendaInput) - xDinding_Kanan;
        }
        thetaStart +=
          (((velocityNowGLBB * 1500) / (diameterBendaInput / 2)) * Math.PI) /
          180;
      } else {
        goLeft = true;
      }
    }
  } else {
    xMoveBola -= velocityNowGLBB;
    velocityNowGLBB -= gayaGesekInput / 10;
    kecepatanBendaID.value = velocityNowGLBB;
    refreshVelocity();
    allRefresh();
    if (velocityNowGLBB > 0) {
      if (xBola - diameterBendaInput / 2 > xDinding_Kiri) {
        if (xBola - diameterBendaInput / 2  - kecepatanBendaInput < xDinding_Kiri) {
          xMoveBola += xDinding_Kiri - (xBola - diameterBendaInput/2 - kecepatanBendaInput);
        }
        thetaStart -=
          (((velocityNowGLBB * 1500) / (diameterBendaInput / 2)) * Math.PI) /
          180;
      } else {
        goLeft = false;
      }
    }
  }
  if (velocityNowGLBB > 0) {
    requestAnimationFrame(GLBBAnimation);
  }
}

function jatuhBenda() {
  countingHeight();
  kecepatanBendaID.value = 0;
  refreshVelocity();
  window.requestAnimationFrame(dropAnimation);
}

function GLB() {
  if (!glbIsCLicked) {
    glbIsCLicked = true;
    window.requestAnimationFrame(GLBAnimation);
  } else {
    glbIsCLicked = false;
  }
}

function GLBB() {
  velocityNowGLBB = gayaBendaInput;
  window.requestAnimationFrame(GLBBAnimation);
}

/*
Running
*/
function init() {
  refreshDraw();
  refresh_Text_Input();
}

init();
window.onload = init;
