require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    expect(true).toBe(true);
  });

  it("should access game", function () {
    expect(Game).toBeDefined();
  });
});

describe("Playing the game", function () {
  it("should be able to addPlayer a player", function () {
    const game = new Game();

    const addedPlayer = game.addPlayer('New player');
    expect(addedPlayer).toBe(true);
  })

  it("should not be playable with 0 or 1 player", function () {
    const game = new Game();

    expect(game.isPlayable()).toBe(false);

    game.addPlayer('Player 1');
    expect(game.isPlayable()).toBe(false);
  })

  it("should be playable with 2 or more players", function () {
    const game = new Game();

    game.addPlayer('Player 1');
    game.addPlayer('Player 2');
    expect(game.isPlayable()).toBe(true);

    game.addPlayer('Player 3');
    expect(game.isPlayable()).toBe(true);
  })

  it("should be able to roll the dice", function () {
    spyOn(console, 'log');

    const game = new Game();
    const diceRoll = 6;

    game.addPlayer('Player 1');
    game.addPlayer('Player 2');
    game.addPlayer('Player 3');

    game.roll(diceRoll);

    //TODO: find better way to check whether the roll function actually did what it was supposed to do
    expect(console.log).toHaveBeenCalled();
  })
});
