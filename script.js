score = 0;
cross = true;

// audio = new Audio('./images/music.mp3');
audiogo = new Audio('./images/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);


document.addEventListener('keydown', function (e) {
    const dino = document.querySelector('.dino');
    const dinoStyle = window.getComputedStyle(dino);
    const dinoX = parseInt(dinoStyle.getPropertyValue('left'));

    console.log("Key pressed: ", e.key);

    switch (e.key) {
        case 'ArrowUp':
            if (!dino.classList.contains('animateDino')) {
                dino.classList.add('animateDino');
                setTimeout(() => {
                    dino.classList.remove('animateDino');
                }, 700);
            }
            break;
        case 'ArrowRight':
            dino.style.left = (dinoX + 112) + 'px';
            break;
        case 'ArrowLeft':
            dino.style.left = (dinoX - 112) + 'px';
            break;
    }
});


setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}