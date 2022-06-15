// test Potion with mock values
const Potion = require('../lib/Potion');

// replaces the constructor's implementation with fake data
jest.mock('../lib/Potion');

// test Player exists
const Player = require('../lib/Player');

test('creates a player object' , () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
})

// test player.getStats() returns an object with four specific properties
test('get player stats as an object' , () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

// does player have inventory
test('gets inventory from player or returns false' , () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

// get information about the player's health
test('gets player health value' , () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// is player alive or unalive?
test('check if player is alive or not' , () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    // update player.health halfway thorugh the test to test both conditions
    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// confirm the correct amount of health is subtracted
test('subtract from player health' , () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
        expect(player.health).toBe(oldHealth - 5);

    // avoid negative health value
    player.reduceHealth(99999);
        expect(player.health).toBe(0)
})