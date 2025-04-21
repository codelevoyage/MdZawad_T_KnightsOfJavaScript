// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}


// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 0 - 24
        playerTwoHealthNum -= Math.floor(Math.random() * 25) + 1;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealth.innerHTML = 0;
            // ends the game
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    } else if (gameState.whoseTurn === 2) {
        // if it's currently player 2's turn (after their move)
        // switch the turn back to player 1
        gameState.whoseTurn = 1;

        // update the UI to show it's now Player 1's turn
        let playerName = document.getElementById("playerName");
        playerName.innerHTML = `Player ${gameState.whoseTurn}`;
    }
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";

    // Disable attack buttons for both players
    let playerOneAttackButton = document.getElementById("playerOneAttack");
    let playerTwoAttackButton = document.getElementById("playerTwoAttack");

    playerOneAttackButton.disabled = true;
    playerTwoAttackButton.disabled = true;

    playerOneAttackButton.classList.remove("active");
    playerOneAttackButton.classList.add("inactive");

    playerTwoAttackButton.classList.remove("active");
    playerTwoAttackButton.classList.add("inactive");

    //game ending sound
    const gameOverSound = document.getElementById("SFX_GameOver");
    gameOverSound.play()
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.pause();
        enemyDamage.currentTime = 0;
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

function attackPlayerOne() {

    // this function updates the button states so Player 1's button is disabled
    // and Player 2's button is enabled for their turn
    function changeButtonStatusToPlayerTwo() {
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");

        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");
    }

    function animatePlayerTwo() {
        // an array containing the images using in player Two's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerTwoFrames = [
            "./images/L_Idle.png",
            "./images/L_Attack.png"
        ];

        let playerSprite = document.getElementById("playerTwoSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerTwoFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack2");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage2");
        // sound that plays when enemy takes damage
        enemyDamage.pause();
        enemyDamage.currentTime = 0;
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage2");
            enemySprite.classList.add("idle");

            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack2");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerTwoSprite, 350);
    }

    // check if it's Player 2's turn
    if (gameState.whoseTurn === 2) {
        // play the attack animation and damage effect for Player 2
        animatePlayerTwo();
        // change button states: disable Player 2's button and enable Player 1's
        changeButtonStatusToPlayerTwo();

        // get the current health value of Player 1
        let playerOneHealth = document.getElementById("playerOneHealth");
        // convert the health value from string to number
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        // reduce Player 1's health by a random number between 1 - 25
        playerOneHealthNum -= Math.floor(Math.random() * 25) + 1;
        playerOneHealth.innerHTML = playerOneHealthNum;

        // check if Player 1's health is 0 or lower
        if (playerOneHealthNum <= 0) {
            // make sure health doesn’t go below 0
            playerOneHealth.innerHTML = 0;
            // call the gameOver function to end the game and show the winner
            gameOver();
        } else {
            // if the game is not over, switch to the next player's turn
            changePlayer();
        }
    }
}
