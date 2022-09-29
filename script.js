// Use a module to objects that you need only once.
// And factories for objects that you need more than once

// 1. Gameboard object
// 1.1. Function to render array to webpage (check)
// 2. Player object
// 2.1. Function to add a mark to a specific spot (check)
// 3. Game object
// 3.1. Function that checks when game is over (3-row or tie) (check)
// 3.2. Function to restart game (check)
// 3.2.1. Create new player 1 and 2 (with names)

// Decide how and what happens when game starts
// Decide how and what happens when game ends
// Decide how and what happens when game restart

const gameboard = ( () => {
    let moves = ["","","","","","","","",""];
    const renderLayout =  () => {
        let gameboardContainer = document.querySelector(".gameboard-container");
        for(let i = 1; i < 10; i++){
            let square = document.createElement("div");
            square.addEventListener("click", () => {
                game.determineWhoPlays();
            })
            square.id = i;
            square.setAttribute("class","square");
            gameboardContainer.appendChild(square);
        }
    };
    const countGameboardPlays = () => {
        let gameboardPlays = 0;
        moves.forEach(move => {
            if(move==="X" || move==="O") gameboardPlays++;
        });
        return gameboardPlays;
    }
    return { moves, renderLayout, countGameboardPlays };
})();

const Player = (name) => {
    const getName = () => name;
    const makeAMove = () => console.log("Mark added");
    return { makeAMove, getName };
}
