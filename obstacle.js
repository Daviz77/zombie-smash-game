class Obstacle {
	constructor(ctx, x, y) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.width = 100
		this.height = 100
		this.img = new Image()
		this.img.src = "/images/barriles.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
		}
	}
	draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}
}
