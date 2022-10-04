const gameboard = ( () => {
    let moves = ["","","","","","","","",""];
    const getMoves = () => moves;
    const renderLayout =  () => {
        let gameboardContainer = document.querySelector(".gameboard-container");
        for(let i = 1; i < moves.length+1; i++){
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

    const deleteLayout = () => {
        moves = ["","","","","","","","",""];
        let gameboardContainer = document.querySelector(".gameboard-container");
        while (gameboardContainer.lastElementChild) {
            gameboardContainer.removeChild(gameboardContainer.lastElementChild);
        }
    }

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
            modal.style.display = "none";
            game.restartGame();
        });
    }

    const popDrawMessage = () => {
        const modal = document.getElementById("winner-message");
        const p = document.querySelector(".winner-text")
        p.textContent = "The game it's a DRAW";
        modal.style.display = "block";
        const restartBtn = document.querySelector(".restart-button")
        restartBtn.addEventListener('click', () => {
            modal.style.display = "none";
            game.restartGame();
        });
    }

    return { renderLayout, deleteLayout, countGameboardPlays, popWinnerMessage, popDrawMessage, getMoves};
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

    const createNewPlayers = () =>{
        const playerOne = Player("Diego","X");
        const playerTwo = Player("Jose","O");
        return { playerOne, playerTwo}
    }

    const determineWhoPlays = () =>{
        const gameboardPlays = gameboard.countGameboardPlays();
        if (gameboardPlays%2===0){
            return players.playerOne;
        }else{
            return players.playerTwo;
        }
    };

    const checkWinner = (player) => {
        const gameboardPlays = gameboard.countGameboardPlays();
        if(gameboardPlays===9){
            gameboard.popDrawMessage();
        }
        if(checkHorizontalLines())gameboard.popWinnerMessage(player);
        if(checkVerticalLines())gameboard.popWinnerMessage(player);
        if(checkDiagonalLines())gameboard.popWinnerMessage(player);

        function checkDiagonalLines() {
            return((gameboard.getMoves()[0]===player.getMark() && gameboard.getMoves()[4]===player.getMark() && gameboard.getMoves()[8]===player.getMark())||(gameboard.getMoves()[2]===player.getMark() && gameboard.getMoves()[4]===player.getMark() && gameboard.getMoves()[6]===player.getMark()))?true:false;
        }

        function checkVerticalLines(){
            let verticalLines = [0,0,0];
            for(let i = 1; i<4;i++){
                for(let j = 0; j<9;j+=3){
                    if(i===1 && gameboard.getMoves()[(i-1)+j]===player.getMark()){
                        verticalLines[0]+=(j/3)+1;
                    }else if (i===2 && gameboard.getMoves()[(i-1)+j]===player.getMark()){
                        verticalLines[1]+=(j/3)+1;
                    }else if (i===3 && gameboard.getMoves()[(i-1)+j]===player.getMark()){
                        verticalLines[2]+=(j/3)+1;
                    }
                }
            }
            return (verticalLines[0]===6 || verticalLines[1]===6 || verticalLines[2]===6)? true:false;
        }

        function checkHorizontalLines(){
            let horizontalLines = [0,0,0];
            for(let i = 1; i<gameboard.getMoves().length+1;i++){
                if(i<4 && gameboard.getMoves()[i-1]===player.getMark()){
                    horizontalLines[0]+=i;
                }else if(i>=4 && i<7 && gameboard.getMoves()[i-1]===player.getMark()){
                    horizontalLines[1]+=i-3;
                }else if(i>=7 && gameboard.getMoves()[i-1]===player.getMark()){
                    horizontalLines[2]+=i-6;
                }
            }
            return (horizontalLines[0]===6 || horizontalLines[1]===6 || horizontalLines[2]===6)? true:false;
        }
    }
    const restartGame = () => {
        gameboard.deleteLayout();
        game.startGame();
    }
    return { startGame, createNewPlayers, determineWhoPlays, checkWinner, restartGame };
}

var game = Game();
var players = game.createNewPlayers();
game.startGame();