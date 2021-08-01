const boxes = document.querySelectorAll(".box")


let player = 0

let player1 = [];
let player2 = [];





for (let box of boxes) {

    box.addEventListener("click", event => {
        if (player === 0) {
            const name = "X"
            box.classList.add("red")
            let positionX = parseInt(box.getAttribute('data-pos'))
            player1.push(positionX)
            console.log(player1)
            box.textContent = name;
            if(player1.length >= 3){
                check(name, player1);
            }
            
            player = 1

        } else if (player === 1) {
            const name = "O"
            box.classList.add("blue")
            let positionO = parseInt(box.getAttribute('data-pos'))
            player2.push(positionO)
            console.log(player2)
            box.textContent = name;
            if(player1.length >= 3){
                check(name, player2);
            }
            
            player = 0
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

function check(name, array){
    for(win of winCombos){
        if(win.every((val) => array.includes(val))){
            console.log(name + " is the winner")
        }
        
    }
}


