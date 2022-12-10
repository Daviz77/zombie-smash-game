class Boss {
	constructor(ctx, x, y, width, lifes, speed) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.vy = speed
		this.vx = speed
		this.width = width
		this.lifes = lifes
		this.bullets = []
		this.img = new Image()
		this.img.src = "./images/HD_Zomboss.webp"
		this.bullets.img = new Image()
		this.bullets.src = "./images/moco.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
			this.height = (this.width * this.img.height) / this.img.width
		}
	}

	draw() {
		if (this.isReady) {
			const xSpeed = 6
			const ySpeed = 6
			const diff = this.height + this.y - 710
			if (diff > 0) {
				this.y = 710 - this.height
			}
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
			}
			this.bullets.forEach((bullet) => bullet.draw())
		}

	move(playerX, playerY) {
		console.log(this.x, this.y)
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

		this.bullets.forEach((bullet) => bullet.move())
		if (game.tick % 60 === 0){
			this.isShooting(playerX, playerY)
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
	isShooting(playerX, playerY) {
		const rect = canvas.getBoundingClientRect()

		const bossX = playerX - rect.left
		const bossy = playerY - rect.top

		const normalizedY = this.y + 75
		const normalizedX = this.x - 100

		const diffX = bossX - playerX
		const diffY = bossy - playerY
		const tanNum = Math.atan2(diffY, diffX)

		let vfx = Math.cos(tanNum)
		let vfy = Math.sin(tanNum)

		this.bullets.push(
			new Bullet(this.ctx, normalizedX + this.width, normalizedY, vfx, vfy)
		)
	}
}
