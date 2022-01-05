import { Hex } from "./Hex.js";
import { Layout, LayoutOption } from "./Layout.js";
import { MapType } from "./MapType.js";
import { Orientation } from "./Orientation.js";
import { Point } from "./Point.js";

const testCanvas = document.querySelector(".myCanvas") as HTMLCanvasElement;
testCanvas.width = window.innerWidth;
testCanvas.height = window.innerHeight;

class FloodIt {
	private map: Map<Hex, string>;
	private colors: string[];
	private origin: Point;
	private layout: Layout;
	private orientation: Orientation;
	private ctx: CanvasRenderingContext2D;

	constructor(
		private canvas: HTMLCanvasElement,
		private layoutOption: LayoutOption,
		private mapType: MapType,
		private cellSize: number,
		private mapSize: number,
		private numColors: number
	) {
		const context = canvas.getContext("2d");
		if (context === null) {
			throw new Error("Invalid Canvas element. Please use HTML canvas.");
		} else {
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
		} else {
			this.orientation = Layout.pointy;
		}

		this.layout = new Layout(
			this.orientation,
			new Point(this.cellSize, this.cellSize),
			this.origin
		);
	}

	private rand(n: number) {
		return Math.floor(Math.random() * n);
	}

	private drawHexagon(h: Hex, c: string) {
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

	private initHexMap(map_radius: number): void {
		for (let q = -map_radius; q <= map_radius; q++) {
			let r1 = Math.max(-map_radius, -q - map_radius);
			let r2 = Math.min(map_radius, -q + map_radius);
			for (let r = r1; r <= r2; r++) {
				this.map.set(
					new Hex(q, r, -q - r),
					this.colors[this.rand(this.numColors)]
				);
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
		if (this.mapType === MapType.Hexagon) {
			this.initHexMap(this.mapSize);
		}
		// initParallelMap(-10, 10, -10, 10);
		// initVertTriangleMap(10);
		// initRectangleMap(10, 10);
		this.drawHexMap();
	}
}

new FloodIt(testCanvas, LayoutOption.Pointy, MapType.Hexagon, 10, 5, 8).run();
