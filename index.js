const game = new Game("canvas")

window.onload = () => {
	game.start()
}

document.addEventListener("keydown", (event) => {
	game.onKeyEvent(event)
})

document.addEventListener("keyup", (event) => {
	game.onKeyEvent(event)
})
