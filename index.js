const game = new Game("canvas")
const startBtn = document.getElementById('start-btn');
const title = document.getElementById('title');
const bgd = document.getElementById('start')
const secondTry = document.getElementById('try-again')

startBtn.addEventListener('click', () => {
    startBtn.classList.add("hidden");
    title.classList.add("hidden");
    bgd.classList.add("hidden");
		//secondTry.classList.add(!"hidden")
    game.start();
});

document.addEventListener("keydown", (event) => {
	game.onKeyEvent(event)
})

document.addEventListener("keyup", (event) => {
	game.onKeyEvent(event)
})

document.addEventListener('click', (event) => {
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