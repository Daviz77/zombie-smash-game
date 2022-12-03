class Bullet {
	constructor(ctx, x, y) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.height = 10
		this.width = 20

		this.img = new Image()
		this.img.src = "./images/PngItem_709207.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
		}

		this.speed = 3
	}

	draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}

	move() {
		this.x += this.speed
	}

	isColliding(obj) {
		return (
			this.x < obj.x + obj.width &&
			this.x + this.width > obj.x &&
			this.y < obj.y + obj.height &&
			this.y + this.height > obj.y
		)
	}
}
