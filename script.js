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
        fieldEl.setAttribute('id', fieldIndex);
        setPieceId(fieldEl);
    });
}

function setPieceId(fieldEl) {
    [...fieldEl.children].forEach((piece, pieceIndex) => {
        piece.setAttribute('id', pieceIndex + 1);
    })
}

function playerTurn(fieldIndex) {
    setGamePiece(fieldIndex);
    changePlayer();
    drawGameBoard();
}

function setGamePiece(fieldIndex) {
    gameBoard[fieldIndex] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
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



init();