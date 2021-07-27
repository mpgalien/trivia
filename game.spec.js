require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Your specs...", function() {
  it("should be playable after adding 2 players or more", function() {
    var game = new Game();

    expect(game.isPlayable()).toBe(false);

    const addedPlayer1 = game.add('Player 1');
    expect(addedPlayer1).toBe(true);
    expect(game.isPlayable()).toBe(false);

    const addedPlayer2 = game.add('Player 2');
    expect(addedPlayer2).toBe(true);
    expect(game.isPlayable()).toBe(true);
  })
});
