class BulletBoss {
	constructor(ctx, x, y, xSpeed, ySpeed) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.height = 20
		this.width = 20
		this.img = new Image()
		this.img.src = "./images/moco.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
		}

		this.xSpeed = 8 * xSpeed
		this.ySpeed = 8 * ySpeed
		
		this.imgInverse = new Image ()
		this.imgInverse.src = "./images/mocoInverso.png"
	}

	draw() {
		if (this.isReady) {
			if (this.xSpeed >= 0) {
				this.ctx.drawImage(this.imgInverse, this.x, this.y, this.width, this.height)
			} else {
				this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
			}
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
