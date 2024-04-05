let CANVAS = document.getElementById("myCanvas");
let ctx = CANVAS.getContext("2d");
let CanvasMiddleX = CANVAS.width / 2;
let CanvasMiddleY = CANVAS.height / 2;

// Get Input ID
const jarakDindingID = document.getElementById("jarakDinding");
const kecepatanBendaID = document.getElementById("kecepatanBenda");
const tinggiBendaID = document.getElementById("tinggiBenda");
const diameterBendaID = document.getElementById("diameterBenda");

// Get Text Value
let jarakDindingValText = document.getElementById("jarakDindingValue");
let kecepatanBendaValText = document.getElementById("kecepatanBendaValue");
let tinggiBendaValText = document.getElementById("tinggiBendaValue");
let diameterBendaValText = document.getElementById("diameterBendaValue");

// Get User Input
let jarakDindingInput = Number(jarakDindingID.value);
let kecepatanBendaInput = Number(kecepatanBendaID.value);
let tinggiBendaInput = Number(tinggiBendaID.value);
let diameterBendaInput = Number(diameterBendaID.value);

function refresh_Text_Input() {
  jarakDindingValText.textContent = jarakDindingID.value;
  kecepatanBendaValText.textContent = kecepatanBendaID.value;
  tinggiBendaValText.textContent = tinggiBendaID.value;
  diameterBendaValText.textContent = diameterBendaID.value;
}
refresh_Text_Input();

jarakDindingID.addEventListener("input", () => {
  jarakDindingInput = Number(jarakDindingID.value);
  refresh_Text_Input();
  refreshDraw();
});

kecepatanBendaID.addEventListener("input", () => {
  kecepatanBendaInput = Number(kecepatanBendaID.value);
  refresh_Text_Input();
});

tinggiBendaID.addEventListener("input", () => {
  tinggiBendaInput = Number(tinggiBendaID.value);
  refresh_Text_Input();
  refreshDraw();
});

diameterBendaID.addEventListener("input", () => {
  diameterBendaInput = Number(diameterBendaID.value);
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

function dinding_lantai() {
  // Initial Variable
  xDinding_Kiri = jarakDindingInput;
  xDinding_Kanan = CANVAS.width - jarakDindingInput;
  yLantai = CanvasMiddleY + (1 / 1.2) * CanvasMiddleY;

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

  // Lantai
  for (let index = 0; index < 5; index++) {
    garisDDA(xDinding_Kiri, yLantai, xDinding_Kanan, yLantai, "biruTua");
    yLantai += 1;
  }
}

function gambarBola() {
  yLantai = CanvasMiddleY + (1 / 1.2) * CanvasMiddleY;
  let xBola = jarakDindingInput + diameterBendaInput / 2 + 20;
  let yBola = yLantai - diameterBendaInput / 2 - tinggiBendaInput;

  Lingkaran(xBola, yBola, diameterBendaInput / 2);
}

function refreshDraw() {
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  requestAnimationFrame(gambarBola);
  requestAnimationFrame(dinding_lantai);
}   

/*
Running
*/
refreshDraw();
