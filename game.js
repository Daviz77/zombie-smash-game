class Game {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId)
		this.ctx = this.canvas.getContext("2d")
		this.bg = new Background(this.ctx)
		this.player = new Player(this.ctx, 100, 100)
		this.obstacle = new Obstacle(this.ctx, 200, 200)
		this.zombies = []
		this.tick = 0
		this.intervalId = null
	}

	start() {
		this.intervalId = setInterval(() => {
			this.clear()
			this.draw()
			this.move()
			this.tick++
			let zombiesCounter = 0

			if (this.tick % 90 === 0 && zombiesCounter < 50) {
				this.addZombie()
				zombiesCounter++
			}
			this.checkCollisions()
		}, 1000 / 60)
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	draw() {
		this.bg.draw()
		this.player.draw()
		this.obstacle.draw()
		this.zombies.forEach((zombie) => {
			zombie.draw()
		})
	}
	move() {
		this.player.move()
		this.zombies.forEach((zombie) => {
			zombie.move(this.player.x, this.player.y, this.player.movements)
		})
	}

	addZombie() {
		const randomWidth = Math.random() * (140 - 60) + 50
		const randomY = Math.random() * (900 - 250) + 250
		const axisX = 1500

		this.zombies.push(new Zombie(this.ctx, axisX, randomY, randomWidth))
	}

	checkCollisions() {
		this.zombies.forEach((zombie) => {
			const playerDead = this.player.isColliding(zombie)

			if (playerDead) {
				this.gameOver()
				clearInterval(this.intervalId);
			}
		})
		this.player.bullets.forEach((bullet) => {
			this.zombies.forEach((zombie) => {
				const isColliding = bullet.isColliding(zombie);

				if (isColliding) {
					this.zombies.splice(this.zombies.indexOf(zombie), 1);
					this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1);
				}
			})
		})
	}

	onKeyEvent(event) {
		event.preventDefault()
		this.player.onKeyEvent(event)
	}
	onKeyEvent(event) {
		this.player.onKeyEvent(event)
	}

	gameOver() {
		clearInterval(this.intervalId);
		this.ctx.fillStyle = "rgba(50, 50, 50, 0.7)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = 'red';
		this.ctx.font = "100px Comic Sans";
		this.ctx.textAlign = "center";
		this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
	}
}
