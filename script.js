'use strict';

const fieldsEl = document.querySelectorAll('td');

let gameBoard = new Array(9);
let currentPlayer = 1;


function init() {
    gameBoard.fill(0);

    setupFields();
}

function setupFields() {
    fieldsEl.forEach((fieldEl, fieldIndex) => {
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
    setGamePiece(fieldIndex);
    checkWinner();
    changePlayer();
    changePlayerLabel();
    drawGameBoard();
}

function setGamePiece(fieldIndex) {
    gameBoard[fieldIndex] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function changePlayerLabel() {
    const playerOneLabel = document.getElementById('player1-label');
    const playerTwoLabel = document.getElementById('player2-label');

    if (currentPlayer === 1) {
        playerOneLabel.classList.remove('d-none');
        playerTwoLabel.classList.add('d-none');
    } else {
        playerOneLabel.classList.add('d-none');
        playerTwoLabel.classList.remove('d-none');
    }
}

function drawGameBoard() {
    fieldsEl.forEach((fieldEl, fieldIndex) => {
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
        console.log('winner', currentPlayer);
    };
    if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] != 0) {
        console.log('winner', currentPlayer);
    };
    if (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]  && gameBoard[6] != 0) {
        console.log('winner', currentPlayer);
    };

    // Check Vertical
    if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] != 0) {
        console.log('winner', currentPlayer);
    };
    if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] != 0) {
        console.log('winner', currentPlayer);
    };
    if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] != 0) {
        console.log('winner', currentPlayer);
    };

    // Check Diagonal
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] != 0) {
        console.log('winner', currentPlayer);
    };
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] != 0) {
        console.log('winner', currentPlayer);
    };

    // Check Draw


    // for (let index = 0; index < 3; index++) {
    //     // Check Vertical
    //     if (gameBoard[index] === gameBoard[index + 3] && gameBoard[index + 3] === gameBoard[ index + 6] && gameBoard[index] != 0) {
    //         console.log('winner', index);
    //     };
    // }
}



init();