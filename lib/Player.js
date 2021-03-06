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

// alive method
Player.prototype.isAlive = function () {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// health method
Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    // don't allow negative values. if negative, set to 0
    if (this.health < 0) {
        this.health = 0;
    }
}

// get attack value method
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
}

// add potion method
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
}

// use the potion method
Player.prototype.usePotion = function(index) {
    // splice is removing something (this used potion) from an array and puts it in a 'removed items' array
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
};

module.exports = Player;