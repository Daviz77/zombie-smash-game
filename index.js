const game = new Game("canvas")
const title = document.getElementById('title');
const bgd = document.getElementById('start')

document.addEventListener("keydown", (event) => {
	if (event.key === 'Enter' && !game.started) {
    title.classList.add("hidden");
    bgd.classList.add("hidden");
		game.start()
	}
	game.onKeyEvent(event)
})

document.addEventListener("keyup", (event) => {
	game.onKeyEvent(event)
})

document.addEventListener('click', (event) => {
	event.preventDefault()
	game.onClickEvent(event)
})

/*document.addEventListener('click', () => {
	secondTry.classList.add('hidden');
	startBtn.click();
})
*/
/*
Document.addEventListener("MouseEvente.CLICK", (event => {
	game.onKeyEvent(event)
}))
*/

   // startSound.play();
    // startSound.volume = 0.09;