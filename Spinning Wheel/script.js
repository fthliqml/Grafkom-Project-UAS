var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var slices = 6;
var angle = 0;
var spinning = false;
var spinSpeed = Math.PI / 100;
var maxSpinSpeed = Math.PI / 1.6;
var minSpinSpeed = Math.PI / 2;
var spinAcceleration = Math.PI / 250;
var spinDuration = 3000;
var prizes = ["hadiah 1", "zonk", "hadiah 2", "zonk", "hadiah 3", "zonk"];
var selectedPrize = null;
var totalSpins = 0;
var spinsToPrize = 3; 
var colors = ['#F0F8FF', '#FF0000', '#00FFFF', '#FF0000', '#00FF00', '#FF0000'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawWheel();
}

window.addEventListener('resize', resizeCanvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawWheel() {
    var end = angle;
    var sliceAngle = Math.PI * 2 / slices;

    for (var i = 0; i < slices; i++) {
        var startAngle = end;
        var endAngle = end + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, startAngle, endAngle, false);
        ctx.closePath();

        var gradient = ctx.createLinearGradient(
            canvas.width / 2 + Math.cos(startAngle) * canvas.height / 2, canvas.height / 2 + Math.sin(startAngle) * canvas.height / 2,
            canvas.width / 2 + Math.cos(endAngle) * canvas.height / 2, canvas.height / 2 + Math.sin(endAngle) * canvas.height / 2
        );
        gradient.addColorStop(0, colors[i]);
        gradient.addColorStop(0.5, '#FFFFFF');
        gradient.addColorStop(1, colors[i]);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = colors[i];

        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var textAngle = startAngle + (endAngle - startAngle) / 2;
        var textRadius = canvas.height / 3;
        var x = canvas.width / 2 + Math.cos(textAngle) * textRadius;
        var y = canvas.height / 2 + Math.sin(textAngle) * textRadius;
        ctx.fillText(prizes[i], x, y);

        end = endAngle;
    }

    drawArrow();
}

function drawArrow() {
    var arrowWidth = 30;
    var arrowHeight = 20;
    var arrowExtension = 10; // panjang perpanjangan ujung panah

    var arrowX = (canvas.width - arrowWidth) / 2;
    var arrowY = (canvas.height - arrowHeight) / 2;

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(arrowX + arrowWidth + arrowExtension, arrowY + arrowHeight / 2);
    ctx.lineTo(arrowX, arrowY + arrowHeight);
    ctx.closePath();
    ctx.fill();
}

function updateCurrentSlice() {
    var sliceAngle = Math.PI * 2 / slices;
    var arrowAngle = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); 
    var arrowIndex = Math.floor((slices - (arrowAngle / sliceAngle)) % slices);

    var currentSliceElement = document.getElementById('current-slice-value');
    currentSliceElement.textContent = prizes[arrowIndex];
}

function spinAnimation(startTime, startSpinSpeed) {
    var currentTime = Date.now();
    var elapsedTime = currentTime - startTime;
    var remainingTime = spinDuration - elapsedTime;

    if (remainingTime <= 0) {
        spinning = false;

        var sliceAngle = Math.PI * 2 / slices;
        var arrowAngle = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        var arrowIndex = Math.floor((slices - (arrowAngle / sliceAngle)) % slices);

        if (totalSpins < spinsToPrize) {
            selectedPrize = prizes[arrowIndex] === "zonk" ? "zonk" : "Hadiah " + (arrowIndex + 1);
        } else {
            selectedPrize = "zonk";
        }

        totalSpins++;

        return;
    }

    var easingFactor = remainingTime / spinDuration;
    var spinSpeed = startSpinSpeed * easingFactor;
    angle += spinSpeed;
    drawWheel();
    updateCurrentSlice(); 
    requestAnimationFrame(() => {
        spinAnimation(startTime, startSpinSpeed - spinAcceleration);
    });
}

document.getElementsByClassName("close")[0].onclick = function() {
    var modal = document.getElementById("myModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
};

document.getElementById('spinButton').addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        var startTime = Date.now();
        var startSpinSpeed = maxSpinSpeed;
        angle = Math.random() * Math.PI * 2;
        spinAnimation(startTime, startSpinSpeed);
    }
});

document.getElementById("changeColorButton").addEventListener("click", function() {
    var sliceIndex = document.getElementById("sliceNumber").value;
    var color = document.getElementById("sliceColor").value;
    colors[sliceIndex] = color;
    drawWheel();
});

resizeCanvas();
