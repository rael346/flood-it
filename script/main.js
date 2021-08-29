import { Hex } from "./hex.js";
import { Layout, Point } from "./layout.js";


const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const origin = new Point(width / 2, height / 2);
const layout = new Layout(Layout.pointy, new Point(15, 15), origin);

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

function rand(n) {
  return Math.floor(Math.random() * n);
}

function drawHexagon(h, c) {
  ctx.fillStyle = c;
  let corners = layout.polygonCorners(h);
  ctx.beginPath();
  for (const corner of corners) {
    ctx.lineTo(corner.x, corner.y);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

const map = new Map();

function initHexMap(map_radius) {
  for (let q = -map_radius; q <= map_radius; q++) {
    let r1 = Math.max(-map_radius, -q - map_radius);
    let r2 = Math.min(map_radius, -q + map_radius);
    for (let r = r1; r <= r2; r++) {
      map.set(new Hex(q, r), colors[rand(8)]);
    }
  }
}

function initParallelMap(q1, q2, r1, r2) {
  for (let q = q1; q <= q2; q++) {
    for (let r = r1; r <= r2; r++) {
      map.set(new Hex(q, r), colors[rand(8)]);
    }
  }
}

function initVertTriangleMap(map_size) {
  for (let q = 0; q <= map_size; q++) {
    for (let r = 0; r <= map_size - q; r++) {
      map.set(new Hex(q, r), colors[rand(8)]);
    }
  }
}

function initRectangleMap(map_height, map_width) {
  for (let r = -10; r < map_height; r++) {
    let r_offset = Math.floor(r / 2); // or r>>1
    for (let q = -r_offset - 10; q < map_width - r_offset; q++) {
      map.set(new Hex(q, r), colors[rand(8)]);
    }
  }
}

function drawHexMap() {
  for (const [hex, col] of map) {
    drawHexagon(hex, col);
  }
}

// initHexMap(10);
// initParallelMap(-10, 10, -10, 10);
// initVertTriangleMap(10);
initRectangleMap(10, 10);
drawHexMap();
