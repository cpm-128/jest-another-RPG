// required packages
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// game function constructor
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// initialize game prototype
Game.prototype.initializeGame = function() {

    // set up Enemy object
        this.enemies.push(new Enemy('goblin' , 'sword'));
        this.enemies.push(new Enemy('orc' , 'baseball bat'));
        this.enemies.push(new Enemy('skeleton' , 'axe'));
        //which enemy object is player
            this.currentEnemy = this.enemies[0];

    // get player name
    inquirer.prompt(
        {
        type: 'text',
        name: 'name',
        message: 'What is your name?'
        }
    )
        //deconstruct name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // test the object creation
            //console.log(this.currentEnemy , this.player);

            // start a new round method
            this.startNewBattle();
        });
};

// Establish who will take their turn first based on their agility values.
Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // Display the Player object's stats.
    console.log('Your stats are: ');
    console.table(this.player.getStats()); // console table allows the entire property at once

    // Display the description of the current Enemy.
    console.log(this.currentEnemy.getDescription());

    // each turn in battle
    this.battle();
};


// export for other file use
module.exports = Game;