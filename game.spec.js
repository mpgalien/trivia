require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Playing the game", function() {
  it("should be able to add a player", function () {
    var game = new Game();

    const addedPlayer = game.add('New player');
    expect(addedPlayer).toBe(true);
  })
  it("should not be playable with 0 or 1 player", function() {
    var game = new Game();

    expect(game.isPlayable()).toBe(false);

    game.add('Player 1');
    expect(game.isPlayable()).toBe(false);
  })
  it("should be playable with 2 or more players", function () {
    var game = new Game();

    game.add('Player 1');
    game.add('Player 2');
    expect(game.isPlayable()).toBe(true);
    
    game.add('Player 3');
    expect(game.isPlayable()).toBe(true);

  })
});
