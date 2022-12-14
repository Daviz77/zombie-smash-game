class Player {
	constructor(ctx, x, y) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.width = 80
		this.height = 80
		this.speed = 12
		this.vx = 0
		this.vy = 0
		this.alive = 1
		this.img = new Image()
		this.bullets = []
		this.img.src = "./images/playerOk.png"
		this.isReady = false
		this.horizontalFrames = 3
		this.verticalFrames = 1
		this.xFrame = 0
		this.yFrame = 0
		this.tick = 0
		this.isMoving = false;
		this.canShoot = true
		this.img.onload = () => {
			this.isReady = true
		}
		
		this.imgInverse = new Image()
		this.imgInverse.src = "./images/playerInverse.png"
		this.leftDirection = true

		this.movements = {
			left: false,
			right: false,
			up: false,
			down: false,
		}
	}

	draw() {
		if (this.isReady) {
			const diff = this.height + this.y - 710
			if (diff > 0) {
				this.y = 710 - this.height
			} 
			if (this.leftDirection) {
				this.ctx.drawImage(
					this.imgInverse,
					this.img.width / this.horizontalFrames * this.xFrame,
					this.img.height / this.verticalFrames * this.yFrame,
					this.img.width / this.horizontalFrames,
					this.img.height / this.verticalFrames,
					this.x,
					this.y,
					this.width,
					this.height
				)
			} else {
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
			}
			this.bullets.forEach((bullet) => bullet.draw())
			this.tick++;
		}
	}
	move() {
		if (this.movements.left) {
			this.leftDirection = true
			this.vx = -this.speed
		} else if (this.movements.right) {
			this.leftDirection = false
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

		if (this.isMoving) {
			this.yFrame = 0;

			if (this.tick % 10 === 0) {
        this.xFrame += 1;

        if (this.xFrame > this.horizontalFrames - 1) {
          this.xFrame = 0;
        }
      }
		}

		if (!this.isMoving) {
      this.yFrame = 0;
      this.xFrame = 2;
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
	onKeyEvent(event) {
		const status = event.type === "keydown"

		if (event.keyCode === 65) {
			this.movements.left = status
			this.isMoving = true
		} else if (event.keyCode === 68) {
			this.isMoving = true
			this.movements.right = status
		} else if (event.keyCode === 87) {
			this.isMoving = true
			this.movements.up = status
		} else if (event.keyCode === 83) {
			this.isMoving = true
			this.movements.down = status
		}

		if (event.type === "keyup") {
			this.isMoving = false;
		}
	}

	onClickEvent(event) {
		const rect = canvas.getBoundingClientRect()

		const clickedX = event.clientX - rect.left
		const clickedY = event.clientY - rect.top

		let normalizedX = this.x;
		if (!this.leftDirection) {
			normalizedX += this.width;
		}
		const normalizedY = this.y + 47;

    function getAxisSpeeds(x1, y1, x2, y2, speed) {
      const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      const xSpeed = (x2 - x1) / (distance * speed);
      const ySpeed = (y2 - y1) / (distance * speed);
      return { xSpeed, ySpeed };
    }

    const bulletSpeed = 1

		const { xSpeed, ySpeed } = getAxisSpeeds(normalizedX, normalizedY, clickedX, clickedY, bulletSpeed);

		this.bullets.push(
			new Bullet(this.ctx, normalizedX, normalizedY, xSpeed, ySpeed)
		);
	}
}
