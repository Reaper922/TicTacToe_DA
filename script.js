'use strict';

const FIELDS_EL = document.querySelectorAll('td');

let gameBoard = new Array(9);
let currentPlayer = 1;
let isDraw = false;
let isGameOver = false;


function init() {
    gameBoard.fill(0);

    setupFields();
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

function playerTurn(fieldIndex) {
    if (gameBoard[fieldIndex]) return;
    if (isDraw) return;
    if (isGameOver) return;

    setGamePiece(fieldIndex);
    checkWinner();
    drawGameBoard();

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
    })
}

function checkWinner() {
    // Check Horizontal
    if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] != 0) {
        isGameOver = true;
        addLine('66.5px', '50%', '0', '1');
    };
    if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] != 0) {
        isGameOver = true;
        addLine('207px', '50%', '0', '1');
    };
    if (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]  && gameBoard[6] != 0) {
        isGameOver = true;
        addLine('347.5px', '50%', '0', '1');
    };

    // Check Vertical
    if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] != 0) {
        isGameOver = true;
        addLine('207px', '16.3%', '90', '1');
    };
    if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] != 0) {
        isGameOver = true;
        addLine('207px', '49.8%', '90', '1');
    };
    if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] != 0) {
        addLine('207px', '83.6%', '90', '1');
        isGameOver = true;
    };

    // Check Diagonal
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] != 0) {
        isGameOver = true;
        addLine('50%', '50%', '46', '1.4')
    };
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] != 0) {
        isGameOver = true;
        addLine('50%', '50%', '-46', '1.4')
    };

    // Check Draw
    isDraw = true;
    for (let field of gameBoard) {
        if (field === 0) {
            isDraw = false
        };
    }

    if (isDraw && !isGameOver) console.log('draw');

    // for (let index = 0; index < 3; index++) {
    //     // Check Vertical
    //     if (gameBoard[index] === gameBoard[index + 3] && gameBoard[index + 3] === gameBoard[ index + 6] && gameBoard[index] != 0) {
    //         console.log('winner', index);
    //     };
    // }
}

function addLine(top, left, rotation, scale) {
    const line = document.createElement('div');
    const lineContainer = document.getElementById('line-container');

    line.classList.add('line');
    line.style = `top: ${top};
                  left: ${left};
                  transform: translate(-50%, -50%) rotate(${rotation}deg) scaleX(${scale});`;

    lineContainer.appendChild(line);
}


init();