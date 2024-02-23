let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let formCont = document.querySelector('.player-form');
let gameCont = document.querySelector('.container');
let msgCont = document.querySelector('.win-modal');
let user1 = document.querySelector('#user1')
let user2 = document.querySelector('#user2')
let msgtag = document.querySelector('.msg');
let scoreBoard = document.querySelector('.score');
let score1 = document.querySelectorAll('.scr1')
let score2 = document.querySelectorAll('.scr2')


let turn0 = true;
let player1Name = '';
let player2Name = '';
let winner = '';
let player1Score = 0;
let player2Score = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];



const checkWinner = () => {
    for (pattern of winPatterns) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                if (pos1val == '0') {
                    winner = player1Name;
                    msgtag.innerText = 'Congratulation ' + winner + ' Win';
                    player1Score = player1Score + 1;
                    score1.forEach(score => {
                        score.innerText = player1Score
                    });
                } else {
                    winner = player2Name;
                    msgtag.innerText = winner + ' Win'
                    player2Score = player2Score + 1;
                    score2.forEach(score => {
                        score.innerText = player2Score
                    });
                }
                msgCont.classList.remove('hide')
            }
        }
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false
        } else {
            box.innerText = "X"
            turn0 = true
        }
        box.disabled = true
        checkWinner()
    })
});

function setPlayer() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;

    if (player1 != '' && player2 != '') {
        player1Name = player1;
        player2Name = player2;
        formCont.classList.add('hide')
        gameCont.classList.remove('hide')
        reset.classList.remove('hide')
        newGame.classList.remove('hide')
        scoreBoard.classList.remove('hide')
        user1.innerText = player1Name;
        user2.innerText = player2Name;
    }
}

const resetScore = () => {
    player1Score = 0;
    player2Score = 0;
    score1.forEach(score => {
        score.innerText = 0
    });

    score2.forEach(score => {
        score.innerText = player2Score
    });
}

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
};

const resetGame = () => {
    turn0 = true;
    enableBoxes()
}

const startNewGame = () => {
    resetGame();
    msgCont.classList.add('hide');
    resetScore()
}

const rematch = () => {
    resetGame();
    msgCont.classList.add('hide');

}


const socket = io();

let userName = '';

document.getElementById('start').addEventListener("click", function () {
    userName = document.getElementById('name').ariaValueMax;

    socket.emit("Find", { name: userName })
    formCont.classList.add('hide')
    gameCont.classList.remove('hide')
    reset.classList.remove('hide')
    newGame.classList.remove('hide')
    scoreBoard.classList.remove('hide')
})