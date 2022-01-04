import { Hex } from "./Hex.js";
import { Layout } from "./Layout.js";
import { Point } from "./Point.js";

const canvas = document.querySelector(".myCanvas") as HTMLCanvasElement;
const width = (canvas.width = window.innerWidth / 2);
const height = (canvas.height = window.innerHeight / 2);
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const origin = new Point(width / 2, height / 2);
const layout = new Layout(Layout.pointy, new Point(15, 15), origin);

class FloodIt {
	private map: Map<Hex, string>;
	private colors;

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

	private rand(n: number) {
		return Math.floor(Math.random() * n);
	}

	private drawHexagon(h: Hex, c: string) {
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

	private initHexMap(map_radius: number): void {
		for (let q = -map_radius; q <= map_radius; q++) {
			let r1 = Math.max(-map_radius, -q - map_radius);
			let r2 = Math.min(map_radius, -q + map_radius);
			for (let r = r1; r <= r2; r++) {
				this.map.set(new Hex(q, r, -q - r), this.colors[this.rand(8)]);
			}
		}
	}

	// function initParallelMap(q1: number, q2: number, r1: number, r2: number) {
	//     for (let q = q1; q <= q2; q++) {
	//         for (let r = r1; r <= r2; r++) {
	//             map.set(new Hex(q, r, -q - r), colors[rand(8)]);
	//         }
	//     }
	// }

	// function initVertTriangleMap(map_size: number) {
	//     for (let q = 0; q <= map_size; q++) {
	//         for (let r = 0; r <= map_size - q; r++) {
	//             map.set(new Hex(q, r, -q - r), colors[rand(8)]);
	//         }
	//     }
	// }

	// function initRectangleMap(map_height: number, map_width: number) {
	//     for (let r = -10; r < map_height; r++) {
	//         let r_offset = Math.floor(r / 2); // or r>>1
	//         for (let q = -r_offset - 10; q < map_width - r_offset; q++) {
	//             map.set(new Hex(q, r, -q - r), colors[rand(8)]);
	//         }
	//     }
	// }

	private drawHexMap(): void {
		for (const [hex, col] of this.map) {
			this.drawHexagon(hex, col);
		}
	}

	public run() {
		this.initHexMap(10);
		this.drawHexMap();
	}

	// initParallelMap(-10, 10, -10, 10);
	// initVertTriangleMap(10);
	// initRectangleMap(10, 10);
}

new FloodIt().run();
