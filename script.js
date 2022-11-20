const main = document.querySelector('.main');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const nextEl = document.getElementById('next-tetro');
const btn = document.querySelector('.menu button');
const gameOverEl = document.querySelector('.game-over');
const restartBtn = gameOverEl.querySelector('button');
const startEl = document.querySelector('.start');
const startBtn = document.querySelector('.start button');
const cont = document.querySelector('.container');
const down = document.querySelector('.down');
const overScoreEl = document.querySelector('.over-score');
const overBestScoreEl = document.querySelector('.over-best-score');


let createPlayField;
// if (document.documentElement.clientWidth < 500) {
//     cont.style.marginLeft = `${(document.documentElement.clientWidth - 330) / 2}px`;
//     console.log(cont);
// }
if (document.documentElement.clientWidth < 380) {
    createPlayField = function() {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    };
} else {
    createPlayField = function() {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    };
}

let playField = createPlayField();

// let playField = Array(20).fill(Array(10).fill(0));
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let currentLevel = 1;

let possibleLevels = {
    1: {
        scorePerLine: 10,
        speed: 400,
        nextLevelScore: 100
    },
    2: {
        scorePerLine: 15,
        speed: 300,
        nextLevelScore: 500
    },
    3: {
        scorePerLine: 25,
        speed: 200,
        nextLevelScore: 1500
    },
    4: {
        scorePerLine: 35,
        speed: 150,
        nextLevelScore: 3500
    },
    5: {
        scorePerLine: 45,
        speed: 100,
        nextLevelScore: Infinity
    }
};

let backupSpeed = possibleLevels[1].speed;

let figures = {
    O: [
        [1, 1],
        [1, 1]
    ],
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    L: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    J: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
};

let activeTetro = getNewTetro();
let nextTetro = getNewTetro();


function moveTetroDown() {
    activeTetro.y += 1;
    if (hasCollisions()) {
        activeTetro.y -= 1;
        fixTetro();
        activeTetro =  nextTetro;
        if (hasCollisions()) {
            gameOver();
        }
        nextTetro = getNewTetro();
    }
}

function addActiveTetro() {
    removeActiveTetro();
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x]) {
                playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            }
        }
    }
}

// draw field
function draw() {
    let mainInnerHTML = '';
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                mainInnerHTML += '<div class="cell movingCell"></div>';
            } else if (playField[y][x] === 2) {
                mainInnerHTML += '<div class="cell fixedCell"></div>';
            } else {
                mainInnerHTML += '<div class="cell"></div>';
            }
        }
    }
    main.innerHTML = mainInnerHTML;
}

function drawNextElement() {
    let nextElInnerHTML = '';
    for (let y = 0; y < nextTetro.shape.length; y++) {
        for (let x = 0; x < nextTetro.shape[y].length; x++) {
            if (nextTetro.shape[y][x] === 1) {
                nextElInnerHTML += '<div class="cell movingCell small"></div>';
            } else {
                nextElInnerHTML += '<div class="unvisCell small"></div>';
            }
        }
        nextElInnerHTML +='<br></br>';
    }
    nextEl.innerHTML = nextElInnerHTML;
}

function hasCollisions() {
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] && (
                playField[activeTetro.y + y] === undefined ||
                playField[activeTetro.y + y][activeTetro.x + x] === undefined ||
                activeTetro.x + x === playField[0].length ||
                playField[activeTetro.y + y][activeTetro.x + x] === 2
                ))
            {
                return true;
            }
        }
    }
    return false;
}   



let isGameOver = false;
function gameOver() {
    console.log('game');
    gameOverEl.style.display = 'block';
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    overScoreEl.textContent = `You Score - ${score}`;
    overBestScoreEl.textContent = `Best Score - ${highScore}`;
    isGameOver = !isGameOver;
}

function removeActiveTetro() {
    for (let y = playField.length-1; y >= 0; y--) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 0;
            }
        }
    }
}

function getNewTetro() {
    let possibleFigures = 'OISZLJT';
    const rand = Math.floor(Math.random()*7);
    return {
        y: 0,
        x: Math.floor((10 - possibleFigures[rand][0].length) / 2),
        shape: figures[possibleFigures[rand]]
    };
}


// fix tetro
function fixTetro() {
    for (let y = playField.length-1; y >= 0; y--) {
        for (let x = 0; x < playField[y].length; x++) {
            if(playField[y][x] === 1) {
                playField[y][x] = 2;
                possibleLevels[currentLevel].speed = backupSpeed;
            }
        }
    }
    removeFullLines();
    isPossibleFastTetro = true;
}


let TETRIS = -1;
let isPossibleFastTetro = true;
function removeFullLines() {
    for (let y = playField.length-1; y >= 0; y--) {
        let fullLines = true;
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] !== 2) {
                fullLines = false;
                break;
            }
        }
        if (fullLines) {
            playField.splice(y, 1);
            playField.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            TETRIS++;
            removeFullLines();
        } else {
            if (TETRIS >= 0) {
                score += possibleLevels[currentLevel].scorePerLine * Math.pow(3, TETRIS);
                TETRIS = -1;
            }
        }
    }
    if (score >= possibleLevels[currentLevel].nextLevelScore) {
        currentLevel++;
        backupSpeed = possibleLevels[currentLevel].speed;
    } 
    scoreEl.innerHTML = score;
    levelEl.innerHTML = currentLevel;
}

// fast down
function moveTetroFast() {
    if (isPossibleFastTetro) {
        backupSpeed = possibleLevels[currentLevel].speed;
        possibleLevels[currentLevel].speed /= 20; 
        isPossibleFastTetro = false;
    }
}

function rotateTetro() {
    const prevTetroState = activeTetro.shape;
    activeTetro.shape = activeTetro.shape[0].map((val, index) => 
        activeTetro.shape.map((row) => row[index]).reverse()
    );

    if (hasCollisions()) {
        activeTetro.shape = prevTetroState;
    }
}

let isResetKeyDown = false;
// onkeydown
document.onkeydown = function(e) {
    if (e.code == 'ArrowLeft' && !gamePause && !isGameOver) {
        activeTetro.x -= 1;
        if (hasCollisions()) {
            activeTetro.x += 1;
        }
    } else if (e.code == 'ArrowRight' && !gamePause && !isGameOver) {
        activeTetro.x += 1;
        if (hasCollisions()) {
            activeTetro.x -= 1;
        }
    } else if (e.code == 'ArrowDown' && !gamePause && !isGameOver) {
        moveTetroFast();
    } else if (e.code == 'ArrowUp' && !gamePause && !isGameOver) {
        rotateTetro();
    } else if (e.code == 'KeyR') {
        location.reload();
    }
    addActiveTetro();
    draw();
};

let drags = new Set(); //set of all active drags
document.addEventListener("touchmove", function(event){
  if(!event.isTrusted){return;}//don't react to fake touches
  Array.from(event.changedTouches).forEach(function(touch){
    drags.add(touch.identifier); //mark this touch as a drag
  });
});
document.addEventListener("touchend", function(event){
  if(!event.isTrusted){return;}
  let isDrag = false;
  Array.from(event.changedTouches).forEach(function(touch){
    if(drags.has(touch.identifier)){
      isDrag = true;
    }
    drags.delete(touch.identifier);//touch ended, so delete it
  });
  if(!isDrag && document.activeElement == document.body){
    //note that double-tap only happens when the body is active
    event.preventDefault(); //don't zoom
    event.stopPropagation(); //don't relay event
    event.target.focus(); //in case it's an input element
    event.target.click(); //in case it has a click handler
    event.target.dispatchEvent(new TouchEvent("touchend",event));
    //dispatch a copy of this event (for other touch handlers)
  }
});


// mobile events
let startPoint={};
let nowPoint;
let ldelay;
document.addEventListener('touchstart', function(event) {
    event.stopPropagation();
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
}, false);
document.addEventListener('touchend', function(event) {
    let pdelay=new Date();
    nowPoint=event.changedTouches[0];
    let xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    let yAbs = Math.abs(startPoint.y - nowPoint.pageY);
    if ((xAbs > 20 || yAbs > 10) && (pdelay.getTime() - ldelay.getTime()) < 200) {
        if (xAbs > yAbs) {
            if (nowPoint.pageX < startPoint.x){}
            else {}
        }
        else {
            if (nowPoint.pageY < startPoint.y){}
            else{
                if (!gamePause && !isGameOver) {
                    moveTetroFast();
                    addActiveTetro();
                    draw();
                }
            }
        }
    } else {
        if (!gamePause && !isGameOver &&
            event.changedTouches[0].pageX > document.documentElement.clientWidth * 1/4 && 
            event.changedTouches[0].pageX < document.documentElement.clientWidth * 3/4) {
                rotateTetro();
                addActiveTetro();
                draw();
        }
    }
}, false);




// Left/Right Tap
document.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    if (e.pageX <= document.documentElement.clientWidth * 1/4) {
        if (!gamePause && !isGameOver) {
            activeTetro.x -= 1;
            if (hasCollisions()) {
                activeTetro.x += 1;
            }
            console.log("Left");
        }
        addActiveTetro();
        draw();
    } else if (e.pageX >= document.documentElement.clientWidth* 3/4 ) { 
        if (!gamePause && !isGameOver) {
            activeTetro.x += 1;
            if (hasCollisions()) {
                activeTetro.x -= 1;
            }
            console.log('right');
        }  
        addActiveTetro();
        draw();
    }
}, false);





let gamePause = false;
btn.addEventListener('click', () => {
    if (!isGameOver) {
        if (gamePause) {
            gamePause = !gamePause;
            btn.textContent = 'Pause';
            startGame();
        } else {
            gamePause = !gamePause;
            btn.textContent = 'Start';
        }
    }
});

function reset() {
    playField = createPlayField();
    gameOverEl.style.display = 'none';
    score = 0;
    currentLevel = 1;
    scoreEl.innerHTML = score;
    levelEl.innerHTML = currentLevel;
    gamePause = false;
    backupSpeed = possibleLevels[1].speed;
    activeTetro = getNewTetro();
    nextTetro = getNewTetro();
    isGameOver = false;
    startGame();
}


restartBtn.addEventListener('click', reset);

startBtn.addEventListener('click', () => {
    startEl.style.display = 'none';
    startGame();
});

scoreEl.innerHTML = score;
levelEl.innerHTML = currentLevel;

draw();
function startGame() {
    moveTetroDown();
    addActiveTetro();
    draw();
    drawNextElement();
    let id = setTimeout(startGame, possibleLevels[currentLevel].speed);
    if (gamePause || isGameOver) {
        clearTimeout(id);
    }
}