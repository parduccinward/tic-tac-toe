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
        for(let i = 1; i < gameboard.moves.length+1; i++){
            let square = document.createElement("div");
            square.addEventListener("click", () => {
                let player = game.determineWhoPlays();
                if(moves[i-1]===""){
                    player.makeAMove(square,player);
                    moves[i-1]=player.getMark();
                    game.checkWinner(player);
                }
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

    const popWinnerMessage = (player) => {
        const modal = document.getElementById("winner-message");
        const p = document.querySelector(".winner-text")
        p.textContent = "The winner is "+player.getName()+"!! Congratulations!";
        modal.style.display = "block";
        const restartBtn = document.querySelector(".restart-button")
        restartBtn.addEventListener('click', () => {
            game.restartGame();
        });
    }

    return { moves, renderLayout, countGameboardPlays, popWinnerMessage};
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    const makeAMove = (square,player) => square.textContent = player.getMark();
    return { makeAMove, getName, getMark };
}

const Game = () => {
    const startGame = () => {
        gameboard.renderLayout();
    };
    const determineWhoPlays = () =>{
        const gameboardPlays = gameboard.countGameboardPlays();
        if(gameboardPlays===9){
            console.log("Determining winner");
        }else if (gameboardPlays%2===0){
            return playerOne;
        }else{
            return playerTwo;
        }
    };

    const checkWinner = (player) => {

        if(checkHorizontalLines())gameboard.popWinnerMessage(player);
        if(checkVerticalLines())gameboard.popWinnerMessage(player);
        if(checkDiagonalLines())gameboard.popWinnerMessage(player);

        function checkDiagonalLines() {
            return((gameboard.moves[0]===player.getMark() && gameboard.moves[4]===player.getMark() && gameboard.moves[8]===player.getMark())||(gameboard.moves[2]===player.getMark() && gameboard.moves[4]===player.getMark() && gameboard.moves[6]===player.getMark()))?true:false;
        }

        function checkVerticalLines(){
            let verticalLines = [0,0,0];
            for(let i = 1; i<4;i++){
                for(let j = 0; j<9;j+=3){
                    if(i===1 && gameboard.moves[(i-1)+j]===player.getMark()){
                        verticalLines[0]+=(j/3)+1;
                    }else if (i===2 && gameboard.moves[(i-1)+j]===player.getMark()){
                        verticalLines[1]+=(j/3)+1;
                    }else if (i===3 && gameboard.moves[(i-1)+j]===player.getMark()){
                        verticalLines[2]+=(j/3)+1;
                    }
                }
            }
            return (verticalLines[0]===6 || verticalLines[1]===6 || verticalLines[2]===6)? true:false;
        }

        function checkHorizontalLines(){
            let horizontalLines = [0,0,0];
            for(let i = 1; i<gameboard.moves.length+1;i++){
                if(i<4 && gameboard.moves[i-1]===player.getMark()){
                    horizontalLines[0]+=i;
                }else if(i>=4 && i<7 && gameboard.moves[i-1]===player.getMark()){
                    horizontalLines[1]+=i-3;
                }else if(i>=7 && gameboard.moves[i-1]===player.getMark()){
                    horizontalLines[2]+=i-6;
                }
            }
            return (horizontalLines[0]===6 || horizontalLines[1]===6 || horizontalLines[2]===6)? true:false;
        }
    }
    const restartGame = () => console.log("Restarting game");
    return { startGame, determineWhoPlays, checkWinner, restartGame };
}

var playerOne = Player("Diego","X");
var playerTwo = Player("Jose","O");
var game = Game(playerOne, playerTwo);
game.startGame();