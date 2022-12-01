class Player {
	constructor(ctx, x, y) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.width = 150
		this.height = 150
		this.speed = 10
		this.vx = 0
		this.vy = 0
		this.img = new Image()
    
    this.bullets = []
		this.img.src = "/images/player.png"
		this.isReady = false
		this.img.onload = () => {
			this.isReady = true
		}
		this.movements = {
			left: false,
			right: false,
			up: false,
			down: false,
		}
	}

	draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.bullets.forEach((bullet) => bullet.draw());
		}
	}
	move() {
		if (this.movements.left) {
			this.vx = -this.speed
		} else if (this.movements.right) {
			this.vx = this.speed
		} else {
			this.vx = 0
		}

		if (this.movements.up) {
			this.vy = -this.speed
		} else if (this.movements.down) {
			this.vy = this.speed
		} else {
			this.vy = 0
		}

		this.x += this.vx
		this.y += this.vy

		if (this.x <= 0) {
			this.x = 0
		} else if (this.x + this.width >= this.ctx.canvas.width) {
			this.x = this.ctx.canvas.width - this.width
		}

		if (this.y <= 0) {
			this.y = 0
		} else if (this.y + this.height >= this.ctx.canvas.height) {
			this.y = this.ctx.canvas.height - this.height
		}

    this.bullets.forEach((bullet) => bullet.move())
	}

	onKeyEvent(event) {
    
		const status = event.type === "keydown"

		if (event.keyCode === 37) {
			this.movements.left = status
		} else if (event.keyCode === 39) {
			this.movements.right = status
		} else if (event.keyCode === 38) {
			this.movements.up = status
		} else if (event.keyCode === 40) {
			this.movements.down = status
		}


		if (event.keyCode === 32) {
       this.bullets.push(new Bullet(this.ctx, this.x, this.y + 50))
		}
	}
}
