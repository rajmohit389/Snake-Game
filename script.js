let dir = { x: 0, y: 0 };
let realdir = { x: 0, y: 0 };
let bool = true;
let board = document.getElementById('board');
let progress = document.querySelector('.score');
let gameOver = new Audio('gameover.mp3');
let foodsound = new Audio('food.mp3');
let movesound = new Audio('move.mp3');
let sarr = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
let a = 2;
let b = 16;
let score = 0;
let speed = 9;
let gamestart=false;
let lastPointTime = 0;
let snakeArr = [{ x: 12, y: 9 }];
let food = { x: 4, y: 6 };
let max = localStorage.getItem('maxscore');
let maxm = document.querySelector('.maxm');
if (max == null) {
    maxm.innerText = 'Max. Score : 0';
}
else {
    maxm.innerText = 'Max. Score : ' + max;
}
// all functions to be used in logic
function main(ctime) {
    if (bool) {
        window.requestAnimationFrame(main);
        if ((ctime - lastPointTime) / 1000 < 1 / speed) {
            return;
        }
        lastPointTime = ctime;
        gameEngine();
        // console.log(speed);
    }
}
function collide() {
    // if ((sarr[0].x + sarr[1].x) != 0 && (sarr[0].y + sarr[1].y) != 0) {
    // }
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
            return true;
        }
    }
    return false;
}
function gameEngine() {
    if (collide()) {
        gameOver.play();
        alert('press any key to start');
        dir = { x: 0, y: 0 };
        snakeArr = [{ x: 12, y: 9 }];
        food = { x: 4, y: 6 };
        score = 0;
        speed = 9;
        gamestart=false;
        progress.innerText = `Your Score : ${score}`;
    }
    else {
        if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
            score = score + 1;
            progress.innerText = `Your Score : ${score}`;
            foodsound.play();
            snakeArr.unshift({ x: snakeArr[0].x + dir.x, y: snakeArr[0].y + dir.y });
            f = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
            if (snakeArr.includes(f)) {
                food = { x: 16, y: 16 };
            }
            else {
                food = f;
            }

            if (score % 5 == 0 && score != 0) {
                speed += 1;
            }
        }

        max = localStorage.getItem('maxscore');
        if (max == null) {
            localStorage.setItem('maxscore', score);
        }
        else if (max != null && score > max) {
            localStorage.setItem('maxscore', score);
        }

        maxm.innerText = 'Max. Score : ' + max;
        // moving the snake
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += dir.x;
        snakeArr[0].y += dir.y;

        for (let i = 0; i < snakeArr.length; i++) {
            if (snakeArr[i].x > 18) {
                snakeArr[i].x = snakeArr[i].x - 18;
            }
            if (snakeArr[i].y > 18) {
                snakeArr[i].y = snakeArr[i].y - 18;
            }
            if (snakeArr[i].x < 1) {
                snakeArr[i].x = snakeArr[i].x + 18;
            }
            if (snakeArr[i].y < 1) {
                snakeArr[i].y = snakeArr[i].y + 18;
            }
        }

        board.innerHTML = '';
        snakeArr.forEach((e, index) => {
            snakeElement = document.createElement('div');
            if (index == 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('body');
            }
            snakeElement.style.gridColumnStart = e.x;
            snakeElement.style.gridRowStart = e.y;
            board.appendChild(snakeElement);
        });

        //food display
        foodElement = document.createElement('div');
        board.appendChild(foodElement);
        foodElement.classList.add('food');
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        // console.log(sarr);
    }
}

//logic of game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // dir = { x: 0, y: 0 };
    if (bool) {
        movesound.play();
    }
    switch (e.key) {
        case "ArrowUp":
            // console.log('up');
            dir.x = 0;
            dir.y = -1;
            gamestart=true;
            break;
        case "ArrowDown":
            // console.log('down');
            dir.x = 0;
            dir.y = 1;
            gamestart=true;
            break;
        case "ArrowLeft":
            // console.log('left');
            dir.x = -1;
            dir.y = 0;
            gamestart=true;
            break;
        case "ArrowRight":
            // console.log('right');
            dir.x = 1;
            dir.y = 0;
            gamestart=true;
            break;
        case "Enter":
            // for the pause button
            if(gamestart){
                if (bool) {
                    bool = false;
                    realdir.x = dir.x;
                    realdir.y = dir.y;
                }
                else {
                    movesound.play();
                    bool = true;
                    dir.x = realdir.x;
                    dir.y = realdir.y;
                    window.requestAnimationFrame(main);
                }
            }
            
        // console.log(bool);
    }
    
    if (bool && gamestart) {
        sarr.unshift({ x: dir.x, y: dir.y });
        if (sarr.length > 3) {
            sarr.pop();
        }
        if ((sarr[0].x + sarr[1].x) == 0 && (sarr[0].y + sarr[1].y) == 0) {
            let sarrdirx=dir.x;
            let sarrdiry=dir.y;
            // swaping sarrdirx sarrdiry;
            snakeArr[0].x += sarrdirx+sarrdiry;
            snakeArr[0].y += sarrdirx+sarrdiry;
        }

        if (snakeArr[0].x > 18) {
            snakeArr[0].x = snakeArr[0].x - 18;
        }
        if (snakeArr[0].y > 18) {
            snakeArr[0].y = snakeArr[0].y - 18;
        }
        if (snakeArr[0].x < 1) {
            snakeArr[0].x = snakeArr[0].x + 18;
        }
        if (snakeArr[0].y < 1) {
            snakeArr[0].y = snakeArr[0].y + 18;
        }
    }
});