const boxes = document.querySelectorAll(".box")


let player = 0; //0 means player 1 and  1 means player 2

let player1 = []; // player 1 position array
let player2 = []; // player 2 position array

let gameState = 0; //0 means game is ongoing, 1 means game is over

hover(player) //hover status, starts off red


for (let box of boxes) {
    
    box.addEventListener("click", event => {

        if (player === 0) {
            const name = "X"
            let positionX = parseInt(box.getAttribute('data-pos'))
            checkBox(positionX)
            player1.push(positionX)
            console.log(player1)
            box.textContent = name;
            player = 1
            if (player1.length >= 3) {
                checkWin(name, player1);
            }
            
            console.log(player)
            
            hover(player)

        } else if (player === 1) {
            const name = "O"
            let positionO = parseInt(box.getAttribute('data-pos'))
            checkBox(positionO)
            player2.push(positionO)
            console.log(player2)
            box.textContent = name;
            player = 0
            if (player1.length >= 3) {
                checkWin(name, player2);
            }
            
            
            
            hover(player)
        }else alert('game over')

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

            alert(name + " is the winner")
            player = 3
            return true
            
        }

    }
}



function hover(player) {
    for (let box of boxes) {
        if(player === 0){
            box.addEventListener("mouseover", event => {
                box.classList.remove("blue")
                box.classList.add("red")
            })
    
            box.addEventListener("mouseleave", event => {
                
                box.classList.remove("red")
            })
        }else{
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


function checkBox(position){
    if(player1.includes(position) || player2.includes(position)){
        alert("you can't click that box")
    
    }
}

