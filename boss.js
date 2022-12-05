class Boss {
	constructor(ctx, x, y, width, lifes, speed) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.vy = speed
		this.vx = speed
		this.width = width
		this.lifes = lifes
		this.img = new Image()
		this.img.src = "./images/player.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
			this.height = (this.width * this.img.height) / this.img.width
		}
	}

	draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}

	move(playerX, playerY) {
		if (this.isReady) {
			if (playerX <= this.x) {
				const diffX = this.x - playerX

				if (diffX < this.vx) {
					this.x -= diffX
				} else {
					this.x -= this.vx
				}

			} else {
				const diffX = playerX - this.x

				if (diffX < this.vx) {
					this.x += diffX
				} else {
					this.x += this.vx
				}
			}

			if (playerY <= this.y) {
				const diffY = this.y - playerY

				if (diffY < this.vy) {
					this.y -= diffY
				} else {
					this.y -= this.vy
				}

			} else {
				const diffY = playerY - this.y
				
				if (diffY < this.vy) {
					this.y += diffY
				} else {
					this.y += this.vy
				}
			}
		}
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
