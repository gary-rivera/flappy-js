let context = c.getContext('2d');
const bird = new Image();
bird.src = 'gary-sprite.png';
birdX = birdDY = score = bestScore = 0;
let birdSize = 45;
interval = pipeWidth = topPipeBottomY = 24; // 1000/24 ~ 42 fps // mother of pearl, what was i thinking with this
birdY = pipeGap = 200;
canvasSize = pipeX = 400;
c.onclick = () => (birdDY = 10); // click === bird image scales up - modify to alter bird gravity

setInterval(() => {
	context.fillStyle = 'skyblue'; //background styling
	context.fillRect(0, 0, canvasSize, canvasSize); // render sky background
	birdY -= birdDY -= 0.5; // vertical speed downward (gravity). Modify to alter difficulty
	context.drawImage(bird, birdX, birdY, birdSize * (524 / 374), birdSize); // render bird image
	context.fillStyle = 'green';
	pipeX -= 8; // move top pipe left
	pipeX < -pipeWidth &&
		((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random())); // randomize gap between pipe
	context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY); //Draw top pipe
	context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize); // draw bottom pipe
	context.fillStyle = 'black'; // score text style
	context.fillText(score++, 9, 25); // current score
	bestScore = bestScore < score ? score : bestScore; // track high score
	context.fillText(`Best: ${bestScore}`, 9, 50); // display high score
	(((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) &&
		pipeX < birdSize * (524 / 374)) ||
		birdY > canvasSize) &&
		((birdDY = 0), (birdY = 200), (pipeX = canvasSize), (score = 0)); // bird 'died' - reset
}, interval);
