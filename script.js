const boxes = document.querySelectorAll(".box"); //getting all boxes from DOM
let displayMessage = document.getElementById("displayMessage"); //getting the messsage display from DOM
let status = document.getElementById("status")
let container = document.getElementById("container");
const reset = document.querySelectorAll("[data-button='reset']")[0]
const pause = document.querySelectorAll("[data-button='pause']")[0];
let resume = document.createElement("button");
resume.classList.add("button");
//0 means player 1
//1 means player 2
//2 means game over <----- change this
let player = 0;

const nameX = "X"
const nameO = "O"


let player1 = []; // player 1 position array
let player2 = []; // player 2 position array

//0 means game is in play
//1 means game is over
//2 means game is paused
let gameState = 0; 


hover(player) //hover status, starts off as player 1


for (let box of boxes) {
        box.addEventListener("click", event => {
        if (gameState === 0) { 
            if (player === 0) {
                let positionX = parseInt(box.getAttribute('data-pos'))
                if (checkBox(positionX) !== true) {
                    displayMessage.textContent = "It is " + nameO + "'s turn"
                    player1.push(positionX)
                    console.log(player1)
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
                    console.log(player2)
                    box.textContent = nameO;
                    player = 0
                    if (player1.length >= 3) {
                        checkWin(nameO, player2);
                        checkDraw()
                    }

                }
                hover(player)

            } 

        }else if (gameState === 1) {
            status.textContent = "The game is over! Why are you still clicking the boxes? Click reset if you want to play again"
    
        }else if (gameState === 2) {
            status.textContent = "The game is paused, remember? click resume to keep playing!"
        }

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
            displayMessage.textContent = (name + " is the winner")
            return true

        }

    }
}



function hover(player) {
    for (let box of boxes) {
        if (player === 0) {
            box.addEventListener("mouseover", event => {
                box.classList.remove("blue")
                box.classList.add("red")
            })

            box.addEventListener("mouseleave", event => {

                box.classList.remove("red")
            })
        } else {
            box.addEventListener("mouseover", event => {
                box.classList.remove("red")
                box.classList.add("blue")
            })

            box.addEventListener("mouseleave", event => {
                box.classList.remove("blue")
            })
        }

    }
}


function checkBox(position) {
    if (player1.includes(position) || player2.includes(position)) {
        displayMessage.textContent = "Why would you click that? Can't you see that box has already been selected?"
        return true
    }
}

function checkDraw() {
    let playerPos = player1.length + player2.length
    if (gameState === 0 && playerPos === 9) {
        gameState = 1
        displayMessage.textContent = "It's a Draw"

    }
}

reset.addEventListener("click", event => {
    status.textContent = "";
    player1.length = 0;
    player2.length = 0;
    gameState = 0;
    player = 0;
    hover(player)
    displayMessage.textContent = "It is " + nameX + "'s turn"
    for(let box of boxes){
        box.textContent = "";

    }
})

pause.addEventListener("click", event =>{
    status.textContent = "Why would you pause a tic tac toe game? *sigh* Anyway hit resume to keep playing"
    gameState = 2;
    resume.textContent = "resume"
    reset.before(resume)
    pause.remove()

})

resume.addEventListener("click", event =>{
    gameState = 0;
    status.textContent = "";
    resume.before(pause)
    resume.remove()
})