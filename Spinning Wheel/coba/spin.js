var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var end = 0;
var color = ['#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#00FF00', '#FF8C00'];
var labels = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'];
var slices = 6;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function spinWheel() {
    var spinAngleStart = Math.random() * 10 + 10;
    var spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel(spinAngleStart, spinTimeTotal);
}

function rotateWheel(spinAngleStart, spinTimeTotal) {
    var spinAngle = spinAngleStart;
    var spinTime = 0;
    var spinTimeTotal = spinTimeTotal;
    var ctx = canvas.getContext("2d");

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < slices; i++) {
            ctx.fillStyle = color[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, end, ((1 / slices) * Math.PI * 2) + end, false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            end += ((1 / slices) * Math.PI * 2) + end;
        }

        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        ctx.rotate((spinAngle * Math.PI) / 180);
        end = -((1 / slices) * Math.PI * 2) / 4;
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinWheel();
