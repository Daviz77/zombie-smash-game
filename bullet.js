class Bullet {
	constructor(ctx, x, y, xSpeed, ySpeed) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.height = 7
		this.width = 7
		this.img = new Image()
		this.img.src = "./images/PngItem_709207.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
		}

		this.xSpeed = 8 * xSpeed
		this.ySpeed = 8 * ySpeed
	}

	draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}

	move() {
		this.x += this.xSpeed
		this.y += this.ySpeed
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
