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

			if (this.tick % 120 === 0 && zombiesCounter < 50) {
				this.addZombie()
				zombiesCounter++
			}
			this.checkCollisions()
		}, 1000 / 60)
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
			zombie.move(this.player.x, this.player.y)
		})
	}

	addZombie() {
		const randomWidth = Math.random() * (120 - 50) + 50
		const randomY = Math.random() * (900 - 250) + 250
		const axisX = 1500 - randomWidth

		this.zombies.push(new Zombie(this.ctx, axisX, randomY, randomWidth))
	}

	checkCollisions() {
		this.player.bullets.forEach((bullet) => {
			this.zombies.forEach((zombie) => {
				if (zombie.alive) {
					zombie.alive = !bullet.isColliding(zombie)
				}
			})
		})
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		//this.zombies = this.zombies.filter(zombie => zombie.y < this.canvas.height);
	}

	onKeyEvent(event) {
		event.preventDefault()
		this.player.onKeyEvent(event)
	}
	onKeyEvent(event) {
		this.player.onKeyEvent(event)
	}
}
