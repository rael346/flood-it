import { Hex } from "./Hex.js";
import { Layout } from "./Layout.js";
import { Point } from "./Point.js";
const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth / 2);
const height = (canvas.height = window.innerHeight / 2);
const ctx = canvas.getContext("2d");
const origin = new Point(width / 2, height / 2);
const layout = new Layout(Layout.pointy, new Point(15, 15), origin);
class FloodIt {
    constructor() {
        this.map = new Map();
        this.colors = [
            "red",
            "yellow",
            "#0b0",
            "#fc6",
            "purple",
            "cyan",
            "#66f",
            "#f0f",
        ];
    }
    rand(n) {
        return Math.floor(Math.random() * n);
    }
    drawHexagon(h, c) {
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
    initHexMap(map_radius) {
        for (let q = -map_radius; q <= map_radius; q++) {
            let r1 = Math.max(-map_radius, -q - map_radius);
            let r2 = Math.min(map_radius, -q + map_radius);
            for (let r = r1; r <= r2; r++) {
                this.map.set(new Hex(q, r, -q - r), this.colors[this.rand(8)]);
            }
        }
    }
    drawHexMap() {
        for (const [hex, col] of this.map) {
            this.drawHexagon(hex, col);
        }
    }
    run() {
        this.initHexMap(10);
        this.drawHexMap();
    }
}
new FloodIt().run();
//# sourceMappingURL=index.js.map