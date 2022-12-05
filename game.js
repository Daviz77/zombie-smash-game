class Game {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId)
		this.ctx = this.canvas.getContext("2d")
		this.bg = new Background(this.ctx)
		this.player = new Player(this.ctx, 100, 100)
		this.boss = new Boss(this.ctx, 1450, 355, 200, 5, 4)
		//this.obstacle = new Obstacle(this.ctx, 200, 200)
		this.zombies = []
		this.bossAlive = false
		this.tick = 0
		this.intervalId = null
		this.started = false
	}

	start() {
		this.started = true
		const zombiesTotal = 2
		let zombiesCounter = 0

		this.intervalId = setInterval(() => {
			this.clear()
			this.draw()
			this.move()
			this.tick++

			if (this.tick % 60 === 0 && zombiesCounter < zombiesTotal) {
				zombiesCounter++
				this.addZombie()
			}
			if (
				!this.bossAlive &&
				zombiesCounter >= zombiesTotal &&
				this.zombies.length === 0
			) {
				this.bossAlive = true
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
		//this.obstacle.draw()
		this.zombies.forEach((zombie) => {
			zombie.draw()
		})

		if (this.bossAlive) {
			this.boss.draw()
		}
	}

	move() {
		this.player.move()
		this.zombies.forEach((zombie) => {
			zombie.move(this.player.x, this.player.y, this.player.movements)
		})
		if (this.bossAlive) {
			this.boss.move(this.player.x, this.player.y)
		}
	}

	addZombie() {
		const randomWidth = Math.random() * (140 - 50) + 50
		const isSuper = randomWidth >= 100
		const speed = isSuper ? 5 : 3
		const lifes = isSuper ? 2 : 1
		const randomY = Math.random() * (710 - 250) + 250
		const axisX = 1450

		this.zombies.push(
			new Zombie(this.ctx, axisX, randomY, randomWidth, lifes, speed)
		)
	}

	checkCollisions() {
		this.zombies.forEach((zombie) => {
			const playerDead = this.player.isColliding(zombie)

			if (playerDead) {
				this.gameOver()
				clearInterval(this.intervalId)
			}
		})

		if (this.bossAlive) {
			const playerDead = this.player.isColliding(this.boss)

			if (playerDead) {
				this.gameOver()
				clearInterval(this.intervalId)
			}
		}

		this.player.bullets.forEach((bullet) => {
			const iscollidingBoss = bullet.isColliding(this.boss)

			if (iscollidingBoss) {
				this.boss.lifes -= 1
				if (this.boss.lifes === 0) {
					this.gameWin()
				}
				this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
			}

			this.zombies.forEach((zombie) => {
				const isColliding = bullet.isColliding(zombie)

				if (isColliding) {
					zombie.lifes -= 1

					if (zombie.lifes === 0) {
						this.zombies.splice(this.zombies.indexOf(zombie), 1)
					}
					this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
				}
			})
		})
	}

	onKeyEvent(event) {
		event.preventDefault()
		this.player.onKeyEvent(event)
	}

	onClickEvent(event) {
		this.player.onClickEvent(event)
	}

	gameOver() {
		clearInterval(this.intervalId)
		this.started = false
		this.ctx.fillStyle = "rgba(50, 50, 50, 0.7)"
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.fillStyle = "red"
		this.ctx.font = "100px Comic Sans"
		this.ctx.textAlign = "center"
		this.ctx.fillText(
			"Game Over",
			this.canvas.width / 2,
			this.canvas.height / 2
		)
		setTimeout(() => location.reload(), 2000)
	}

	gameWin() {
		clearInterval(this.intervalId)
		this.started = false
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.fillStyle = "white"
		this.ctx.font = "80px Comic Sans"
		this.ctx.textAlign = "center"
		this.ctx.fillText(
			"DONT FEEL GOOD, YOU SUCK BRO",
			this.canvas.width / 2,
			this.canvas.height / 2
		)
		setTimeout(() => location.reload(), 4000)
	}
}
