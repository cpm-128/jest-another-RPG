// test Potion with mock values
const Potion = require('../lib/Potion');

// replaces the constructor's implementation with fake data
jest.mock('../lib/Potion');
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );

console.log(new Potion());

// test Player exists
const Player = require('../lib/Player');

test('creates a player object' , () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
})

// test player.getStats() returns an object with four specific properties
test('get player stats as an object' , () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
})

//
test('gets inventory from player or returns false' , () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});