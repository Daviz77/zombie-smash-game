const game = new Game("canvas")
const title = document.getElementById("title")
const bgd = document.getElementById("start")
const song = new Audio("./sounds/Sonido fondo/2019-04-18_-_The_Epic_Boss_Fight_-_David_Fesliyan.mp3")

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && !game.started) {
		title.classList.add("hidden")
		bgd.classList.add("hidden")
		game.start()
		song.play()
		song.volume = 0.8

	}
	game.onKeyEvent(event)
})

document.addEventListener("keyup", (event) => {
	game.onKeyEvent(event)
})

document.addEventListener("click", (event) => {
	event.preventDefault()
	game.onClickEvent(event)
})