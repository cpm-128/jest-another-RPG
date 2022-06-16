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

Game.prototype.battle = function() {
    // If Player turn:
    if (this.isPlayerTurn) {
        // Prompt user to attack or use a Potion
        inquirer.prompt(
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack' , 'Use potion']
            }
        ).then(({ action }) => {
            // If using a Potion:
            if (action === 'Use potion') {
                // Check if potion is available
                if (!this.player.getInventory()) {
                    console.log('You do not have any potions.');
                    // end player turn for not paying attention and knowing they did not have potion
                    return this.checkEndOfBattle();
                }
                // Display list of Potion objects to user
                inquirer.prompt(
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Which potion would you like to use?',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    }
                // Apply selected Potion effect to Player
                ).then(({ action }) => {
                    // identify which potion was selected
                    const potionDetails = action.split(': ');

                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used a ${potionDetails[1]} potion.`);

                    this.checkEndOfBattle();
                });
            // If attacking:
            } else {
                // Subtract health from the Enemy based on Player attack value
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked the ${this.currentEnemy.name}.`);
                console.log(this.currentEnemy.getHealth());

                this.checkEndOfBattle();;
            }
        });
    // If Enemy turn:
    } else {
         // Subtract health from the Player based on Enemy attack value
         const damage = this.currentEnemy.getAttackValue();
         this.player.reduceHealth(damage);

         console.log(`You were attached by the ${this.currentEnemy.name}.`);
         console.log(this.player.getHealth());

         this.checkEndOfBattle();
    }
};

// Check for win/lose conditions immediately after Player || Enemy has taken their turn
Game.prototype.checkEndOfBattle = function() {
    // Check if both are alive in order to continue fighting
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // Player is alive && Enemy is defeated
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You have defeated the ${this.currentEnemy.name}!`);

        // Player is awarded Potion
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion.`);

        // roundNumber increase
        this.roundNumber++;

        // if more Enemies
        if (this.roundNumber < this.enemies.length) {
            // new battle
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        // if not more Enemies
        else {
            // Player wins game
            console.log('YOU WIN!');
        }
    }
    // Player is defeated, game over
    else {
        console.log('You have been defeated. GAME OVER.');
    }
};

// export for other file use
module.exports = Game;