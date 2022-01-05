import { Hex } from "./Hex.js";
import { Layout, LayoutOption } from "./Layout.js";
import { MapType } from "./MapType.js";
import { Point } from "./Point.js";
const testCanvas = document.querySelector(".myCanvas");
testCanvas.width = window.innerWidth;
testCanvas.height = window.innerHeight;
class FloodIt {
    constructor(canvas, layoutOption, mapType, cellSize, mapSize, numColors) {
        this.canvas = canvas;
        this.layoutOption = layoutOption;
        this.mapType = mapType;
        this.cellSize = cellSize;
        this.mapSize = mapSize;
        this.numColors = numColors;
        const context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Invalid Canvas element. Please use HTML canvas.");
        }
        else {
            this.ctx = context;
        }
        canvas.addEventListener("click", (e) => {
            const i = this.ctx.getImageData(e.x, e.y, 1, 1).data;
            const color = "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")";
            console.log(color);
        });
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
        ].slice(0, this.numColors);
        this.origin = new Point(this.canvas.width / 2, this.canvas.height / 2);
        if (this.layoutOption === LayoutOption.Flat) {
            this.orientation = Layout.flat;
        }
        else {
            this.orientation = Layout.pointy;
        }
        this.layout = new Layout(this.orientation, new Point(this.cellSize, this.cellSize), this.origin);
    }
    rand(n) {
        return Math.floor(Math.random() * n);
    }
    drawHexagon(h, c) {
        this.ctx.fillStyle = c;
        let corners = this.layout.polygonCorners(h);
        this.ctx.beginPath();
        for (const corner of corners) {
            this.ctx.lineTo(corner.x, corner.y);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    initHexMap(map_radius) {
        for (let q = -map_radius; q <= map_radius; q++) {
            let r1 = Math.max(-map_radius, -q - map_radius);
            let r2 = Math.min(map_radius, -q + map_radius);
            for (let r = r1; r <= r2; r++) {
                this.map.set(new Hex(q, r, -q - r), this.colors[this.rand(this.numColors)]);
            }
        }
    }
    drawHexMap() {
        for (const [hex, col] of this.map) {
            this.drawHexagon(hex, col);
        }
    }
    run() {
        if (this.mapType === MapType.Hexagon) {
            this.initHexMap(this.mapSize);
        }
        this.drawHexMap();
    }
}
new FloodIt(testCanvas, LayoutOption.Pointy, MapType.Hexagon, 10, 5, 8).run();
//# sourceMappingURL=index.js.map