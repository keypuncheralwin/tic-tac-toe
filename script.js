const boxes = document.querySelectorAll(".box"); //getting all boxes from DOM
let displayMessage = document.getElementById("displayMessage"); //getting the messsage display from DOM
let status = document.getElementById("status")
let container = document.getElementById("container");
const reset = document.querySelector("[data-button='reset']")
const pause = document.querySelector("[data-button='pause']");
const xScore = document.querySelector("[data-score='xScore']");
const drawScore = document.querySelector("[data-score='drawScore']");
const oScore = document.querySelector("[data-score='oScore']");
const twoPlayer = document.querySelector("[data-button='twoP']")
const twist = document.querySelector("[data-button='twist']")
const clearScore = document.querySelector("[data-button='clearScore']")
const buttonContainer = document.querySelectorAll(".button")
let resume = document.createElement("button");
resume.classList.add("button");
const buttonClick = new Audio("buttonClick.wav")
const gameClick = new Audio("gameClick.wav")


hover()
//0 means player 1
//1 means player 2
//2 means player vs Ai
let player

//0 means game is in play
//1 means game is over
//2 means game is paused
let gameState


const nameX = "X"
const nameO = "O"


let player1 = []; // player 1 position array
let player2 = []; // player 2 position array

let scoreObj 

if(JSON.parse(window.localStorage.getItem('scoreInfo'))){
    scoreObj = JSON.parse(window.localStorage.getItem('scoreInfo'))
    console.log("saved scores loaded")
    console.log(scoreObj)
}else{
    scoreObj = {
        x: 0,
        draw: 0,
        o: 0
    }
    console.log("no saved scores")
    console.log(scoreObj)
}


xScore.textContent = scoreObj.x
oScore.textContent = scoreObj.o
drawScore.textContent = scoreObj.draw




let computeRandom


for (let box of boxes) {
    box.addEventListener("click", event => {
        if (gameState === 0) {
            gameClick.play()
            if (player === 0) {
                let positionX = parseInt(box.getAttribute('data-pos'))
                if (checkBox(positionX) !== true) {
                    displayMessage.textContent = "It is " + nameO + "'s turn"
                    player1.push(positionX)
                    console.log("position player1 "+player1)
                    box.textContent = nameX;
                    player = 1
                    if (player1.length >= 3) {
                        checkWin(nameX, player1);
                        checkDraw()
                    }
                }



                hover(player)

            } else if (player === 1) {
                let positionO = parseInt(box.getAttribute('data-pos'))
                if (checkBox(positionO) !== true) {
                    displayMessage.textContent = "It is " + nameX + "'s turn"
                    player2.push(positionO)
                    console.log("position player2 "+player2)
                    box.textContent = nameO;
                    player = 0
                    if (player1.length >= 3) {
                        checkWin(nameO, player2);
                        checkDraw()
                    }

                }
                hover(player)

            } else if (player === 2) {
                status.textContent = "";
                let positionX = parseInt(box.getAttribute('data-pos'))
                if (checkBox(positionX) !== true) {
                    player1.push(positionX)
                    console.log("user " + player1)
                    box.textContent = nameX;
                    if (player1.length >= 3) {
                        checkWin(nameX, player1);
                        checkDraw()
                    }
                    computeRandom = Math.floor(Math.random() * 8)
                    while (player1.includes(computeRandom) || player2.includes(computeRandom) && player1.length <= 4) {
                        computeRandom = Math.floor(Math.random() * 8)
                        console.log(computeRandom)
                    }
                    player2.push(computeRandom)
                    console.log("computer " + player2)

                    if (gameState === 0) {
                        const computerBox = document.querySelector(`[data-pos="${computeRandom}"]`)
                        computerBox.textContent = nameO
                        if (player2.length >= 3) {
                            checkWin(nameO, player2);
                            checkDraw()
                        }
                    }



                }




            }

        } else if (gameState === 1) {
            
            status.textContent = "The game is over! Click restart if you want to play again"

        } else if (gameState === 2) {
            
            status.textContent = "The game is paused! click resume to keep playing!"
        } else status.textContent = "^Click on one of the options above to start Playing!^"
        

    })


}

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWin(name, array) {
    for (win of winCombos) {
        if (win.every((val) => array.includes(val))) {
            gameState = 1;
            player = null;
            displayMessage.textContent = (name + " is the winner")
            scoreTrack(name)
            return true

        }

    }
}



function hover(player) {
    for (let box of boxes) {
        if (player === 0) {
            box.addEventListener("mouseover", event => {
                box.classList.remove("idle")
                box.classList.remove("blue")
                box.classList.add("red")
            })

            box.addEventListener("mouseleave", event => {

                box.classList.remove("red")
            })
        } else if (player === 1) {
            box.addEventListener("mouseover", event => {
                box.classList.remove("idle")
                box.classList.remove("red")
                box.classList.add("blue")
            })

            box.addEventListener("mouseleave", event => {
                box.classList.remove("blue")
            })
        } else {
            box.addEventListener("mouseover", event => {
                box.classList.remove("red")
                box.classList.remove("blue")
                box.classList.add("idle")
            })

            box.addEventListener("mouseleave", event => {
                box.classList.remove("idle")
            })
        }

    }
}


function checkBox(position) {
    if (player1.includes(position) || player2.includes(position)) {
        displayMessage.textContent = "That box has already been filled"
        return true
    }
}

function checkDraw() {
    let playerPos = player1.length + player2.length
    if (gameState === 0 && playerPos === 9) {
        gameState = 1
        scoreObj.draw = scoreObj.draw + 1;
        drawScore.textContent = scoreObj.draw;
        displayMessage.textContent = "It's a Draw"
        window.localStorage.setItem('scoreInfo', JSON.stringify(scoreObj));
    }
}


twoPlayer.addEventListener("click", event => {
    buttonClick.play()
    selector(twoPlayer)
    restart()
    status.textContent = ""
    gameState = 0;
    player = 0
    hover(player)
    displayMessage.textContent = "It is " + nameX + "'s turn"
})

twist.addEventListener("click", event => {
    buttonClick.play()
    selector(twist)
    restart()
    gameState = 0;
    hover(0)
    player = 2
    status.textContent = "So our tic-tac-toe AI is really dumb, see if you could let it win, should be easy right?"
    displayMessage.textContent = "It is " + nameX + "'s turn"

})



reset.addEventListener("click", event => {
    buttonClick.play()
    selector(reset)
    reset.classList.remove("buttonSelected")
    restart()
    hover()

})

function restart() {
    resume.before(pause)
    resume.remove()
    status.textContent = "";
    player1.length = 0;
    player2.length = 0;
    gameState = null;
    player = null;
    displayMessage.textContent = ""
    for (let box of boxes) {
        box.textContent = "";

    }

}




pause.addEventListener("click", event => {
    buttonClick.play()
    selector(resume)
    status.textContent = "Game is paused, click resume to keep playing"
    gameState = 2;
    resume.textContent = "resume"
    reset.before(resume)
    pause.remove()

})

resume.addEventListener("click", event => {
    buttonClick.play()
    selector(pause)
    gameState = 0;
    status.textContent = "";
    resume.before(pause)
    resume.remove()
})

function scoreTrack(name) {
    if (name === nameX) {
        scoreObj.x = scoreObj.x + 1;
        xScore.textContent = scoreObj.x
        window.localStorage.setItem('scoreInfo', JSON.stringify(scoreObj));
    } else scoreObj.o = scoreObj.o + 1;
    oScore.textContent = scoreObj.o
    window.localStorage.setItem('scoreInfo', JSON.stringify(scoreObj));

}

clearScore.addEventListener("click", event => {
    buttonClick.play()
    selector(clearScore)
    clearScore.classList.remove("buttonSelected")
    scoreObj.x = 0;
    scoreObj.o = 0;
    scoreObj.draw = 0;
    xScore.textContent = scoreObj.x;
    oScore.textContent = scoreObj.o;
    drawScore.textContent = scoreObj.draw;
    window.localStorage.clear()

})

function selector(buttonName) {
    for (button of buttonContainer) {
        button.classList.remove("buttonSelected")
    }
    resume.classList.remove("buttonSelected")
    buttonName.classList.add("buttonSelected")
}