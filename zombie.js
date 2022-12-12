class Zombie {
	constructor(ctx, x, y, width, lifes, speed) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.vy = speed
		this.vx = speed
		this.width = width
		this.lifes = lifes
		this.img = new Image()
		this.img.src = "./images/zombie.png"
		this.isReady = false
		this.horizontalFrames = 3
		this.verticalFrames = 1
		this.xFrame = 0
		this.yFrame = 0
		this.tick = 0
		this.img.onload = () => {
			this.isReady = true
			this.height = (this.width * this.img.height) / this.img.width
		}
	}

	draw() {
		if (this.isReady) {
			const diff = this.height + this.y - 710
			if (diff > 0) {
				this.y = 710 - this.height
			}

			this.ctx.drawImage(
				this.img,
				this.img.width / this.horizontalFrames * this.xFrame,
				this.img.height / this.verticalFrames * this.yFrame,
				this.img.width / this.horizontalFrames,
				this.img.height / this.verticalFrames,
				this.x,
				this.y,
				this.width,
				this.height
			)

			this.tick++
		}
	}

	move(playerX, playerY, movements) {
		Object.values(movements).every((value) => !value)

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

			if (this.tick % 10 === 0) {
				this.xFrame += 1;

				if (this.xFrame > 2) {
					this.xFrame = 0;
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
