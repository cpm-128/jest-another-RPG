// test Potion with mock values
const Potion = require('../lib/Potion');

// replaces the constructor's implementation with fake data
jest.mock('../lib/Potion');
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );

console.log(new Potion());

// test Player
const Player = require('../lib/Player');

test('creates a player object' , () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
})