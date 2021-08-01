const boxes = document.querySelectorAll(".box")


let player = 0

let player1 = [];
let player2 = [];


hover(player)


for (let box of boxes) {
    
    box.addEventListener("click", event => {

        if (player === 0) {
            const name = "X"
            let positionX = parseInt(box.getAttribute('data-pos'))
            player1.push(positionX)
            console.log(player1)
            box.textContent = name;
            if (player1.length >= 3) {
                check(name, player1);
            }
            

            player = 1
            hover(player)

        } else if (player === 1) {
            const name = "O"
            let positionO = parseInt(box.getAttribute('data-pos'))
            player2.push(positionO)
            console.log(player2)
            box.textContent = name;
            if (player1.length >= 3) {
                check(name, player2);
            }

            
            player = 0
            hover(player)
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

function check(name, array) {
    for (win of winCombos) {
        if (win.every((val) => array.includes(val))) {
            console.log(name + " is the winner")
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
