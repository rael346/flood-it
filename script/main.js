const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const a = 2 * Math.PI / 6;
const r = 30;

let colors = [
  'red',
  'yellow',
  '#0b0',
  '#fc6',
  'purple',
  'cyan',
  '#66f',
  '#f0f'
];

drawGrid(canvas.width, canvas.height);

function rand(n) {
  return Math.floor(Math.random() * n);
}

function drawHexagon(x, y, c) {
  ctx.fillStyle = c;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawGrid(width, height) {
  for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
    for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
      let c = rand(8);
      drawHexagon(x, y, colors[c]);
    }
  }
}

