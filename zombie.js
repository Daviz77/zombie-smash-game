class Zombie {
	constructor(ctx, x, y, width) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.vy = 2
		this.vx = 2
		this.width = width
		this.alive = true
		this.img = new Image()
		this.img.src = "./images/player.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
			this.height = (this.width * this.img.height) / this.img.width
		}
	}

	draw() {
		if (this.isReady && this.alive) {
			const diff = this.height + this.y - 900
			if (diff > 0) {
				this.y = 900 - this.height
			}

			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}

	move(playerX, playerY) {
		if (this.isReady) {
			if (playerX < this.x) {
				this.x -= this.vx
			} else {
				this.x += this.vx
			}

			if (playerY < this.y) {
				this.y -= this.vy
			} else {
				this.y += this.vy
			}
		}
	}
}
