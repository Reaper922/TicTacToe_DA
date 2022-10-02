'use strict';

const FIELDS_EL = document.querySelectorAll('td');
const SOUND_LIGHT_SABER = new Audio('./sound/lightsaber.mp3');

let gameBoard = new Array(9);
let currentPlayer = 1;
let isDraw = false;
let isGameOver = false;


function init() {
    gameBoard.fill(0);

    setupFields();
    setupButtons();
}

function setupFields() {
    FIELDS_EL.forEach((fieldEl, fieldIndex) => {
        fieldEl.addEventListener('click', () => playerTurn(fieldIndex));
        setPieceId(fieldEl);
    });
}

function setPieceId(fieldEl) {
    [...fieldEl.children].forEach((piece, pieceIndex) => {
        piece.setAttribute('id', pieceIndex + 1);
    })
}

function setupButtons() {
    const SINGLEPLAYER_BTN = document.getElementById('singeplayer-button');
    const MULTIPLAYER_BTN = document.getElementById('multiplayer-button');
    const REPLAY_BTN = document.getElementById('replay-button');

    SINGLEPLAYER_BTN.addEventListener('click', startSingleplayer);
    MULTIPLAYER_BTN.addEventListener('click', startMultiplayer);
    REPLAY_BTN.addEventListener('click', resetGame);
}

function startSingleplayer() {
    console.log('Singeplayer');
}

function startMultiplayer() {
    console.log('Multiplayer');
}

function playerTurn(fieldIndex) {
    if (gameBoard[fieldIndex]) return;
    if (isDraw) return;
    if (isGameOver) return;

    setGamePiece(fieldIndex);
    checkWinner();
    drawGameBoard();

    if (isDraw || isGameOver) showEndScreen();

    if (!isDraw && !isGameOver) {
        changePlayer();
        changePlayerLabel();
    }
}

function setGamePiece(fieldIndex) {
    gameBoard[fieldIndex] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function changePlayerLabel() {
    const PLAYER_ONE_LABEL = document.getElementById('player1-label');
    const PLAYER_TWO_LABEL = document.getElementById('player2-label');

    if (currentPlayer === 1) {
        PLAYER_ONE_LABEL.classList.remove('d-none');
        PLAYER_TWO_LABEL.classList.add('d-none');
    } else {
        PLAYER_ONE_LABEL.classList.add('d-none');
        PLAYER_TWO_LABEL.classList.remove('d-none');
    }
}

function drawGameBoard() {
    FIELDS_EL.forEach((fieldEl, fieldIndex) => {
        if (gameBoard[fieldIndex] === 1) {
            fieldEl.children[0].classList.remove('d-none');
        } else if (gameBoard[fieldIndex] === 2) {
            fieldEl.children[1].classList.remove('d-none');
        }
    });
}

function checkWinner() {
    // Check Horizontal
    if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('71.5px', '50%', '0', '1');
    };
    if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('214.5px', '50%', '0', '1');
    };
    if (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]  && gameBoard[6] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('356.5px', '50%', '0', '1');
    };

    // Check Vertical
    if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('214.5px', '69px', '90', '1');
    };
    if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('214.5px', '50%', '90', '1');
    };
    if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('214.5px', '331px', '90', '1');
    };

    // Check Diagonal
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('50%', '50%', '47', '1.4');
    };
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] != 0) {
        isGameOver = true;
        SOUND_LIGHT_SABER.play();
        addLine('50%', '50%', '-47', '1.4');
    };

    // Check Draw
    isDraw = true;
    for (let field of gameBoard) {
        if (field === 0) {
            isDraw = false
        };
    }

    // for (let index = 0; index < 3; index++) {
    //     // Check Vertical
    //     if (gameBoard[index] === gameBoard[index + 3] && gameBoard[index + 3] === gameBoard[ index + 6] && gameBoard[index] != 0) {
    //         console.log('winner', index);
    //     };
    // }
}

function addLine(top, left, rotation, scale) {
    const LINE = document.createElement('div');
    const LINE_CONTAINER = document.getElementById('line-container');

    LINE.classList.add('line');
    LINE.style = `top: ${top};
                  left: ${left};
                  transform: translate(-50%, -50%) rotate(${rotation}deg) scaleX(${scale});`;

    LINE_CONTAINER.appendChild(LINE);
}

function showEndScreen() {
    setTimeout(() => {
        const END_SCREEN = document.getElementById('end-screen');

        END_SCREEN.classList.remove('d-none');
        END_SCREEN.classList.add('active');
    }, 2000);
}

function hideEndScreen() {
    const END_SCREEN = document.getElementById('end-screen');

    END_SCREEN.classList.add('d-none');
    END_SCREEN.classList.remove('active');
}

function hidePieces() {
    FIELDS_EL.forEach((fieldEl) => {
        fieldEl.children[0].classList.add('d-none');
        fieldEl.children[1].classList.add('d-none');
    })
}

function resetGame() {
    const LINE_CONTAINER = document.getElementById('line-container');

    currentPlayer = 1;
    isDraw = false;
    isGameOver = false;
    gameBoard.fill(0);
    LINE_CONTAINER.innerHTML = '';

    hidePieces();
    hideEndScreen();
    drawGameBoard();
}


init();