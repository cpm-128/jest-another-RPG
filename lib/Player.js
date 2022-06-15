// import the Potion constructor
const Potion = require('../lib/Potion');

// set name parameter to an empty string if no name is provided
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health') , new Potion()];
}

// the next two 'functions' will create a getStats() and getInventory() method on every Player object that is created

// returns an object with various player properties
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

// get player health
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}.`;
};

module.exports = Player;