exports = typeof window !== "undefined" && window !== null ? window : global;

const minNumberOfPlayers = 2;
const numberOfCoinsToWin = 6;
const boardSize = 11;
const POP = 'Pop';
const SCIENCE = 'Science';
const SPORTS = 'Sports';
const ROCK = 'Rock';

exports.Game = function () {
  // TODO: add player class with properties like name, id, place, purse, inPenaltyBox
  var players = new Array();
  var places = new Array(6);
  var purses = new Array(6);
  var inPenaltyBox = new Array(6);

  var popQuestions = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions = new Array();
  var rockQuestions = new Array();

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function () {
    return purses[currentPlayer] === numberOfCoinsToWin;
  };

  var getCurrentCategory = function () {

    switch (places[currentPlayer]) {
      case 0: case 4: case 8:
        return POP;
      case 1: case 5: case 9:
        return SCIENCE;
      case 2: case 6: case 10:
        return SPORTS;
      default:
        return ROCK;
    }
  };

  const categorySize = 50;

  for (var i = 0; i < categorySize; i++) {
    popQuestions.push(POP + " Question " + i);
    scienceQuestions.push(SCIENCE + " Question " + i);
    sportsQuestions.push(SPORTS + " Question " + i);
    rockQuestions.push(ROCK + " Question " + i);
  };

  this.isPlayable = function () {
    return this.numberOfPlayers() >= minNumberOfPlayers;
  };

  this.addPlayer = function (playerName) {
    players.push(playerName);
    places[this.numberOfPlayers() - 1] = 0;
    purses[this.numberOfPlayers() - 1] = 0;
    inPenaltyBox[this.numberOfPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.numberOfPlayers = function () {
    return players.length;
  };


  var askQuestion = function () {
    if (getCurrentCategory() == POP)
      console.log(popQuestions.shift());
    if (getCurrentCategory() == SCIENCE)
      console.log(scienceQuestions.shift());
    if (getCurrentCategory() == SPORTS)
      console.log(sportsQuestions.shift());
    if (getCurrentCategory() == ROCK)
      console.log(rockQuestions.shift());
  };

  this.isOddNumber = function(number) {
    return number % 2 !== 0;
  }

  this.roll = function (roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (this.isOddNumber(roll)) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > boardSize) {
          places[currentPlayer] = places[currentPlayer] - (boardSize + 1);
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + getCurrentCategory());
        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > boardSize) {
        places[currentPlayer] = places[currentPlayer] - (boardSize + 1);
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + getCurrentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
          purses[currentPlayer] + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;
        return false;
      }



    } else {

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
        purses[currentPlayer] + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
    return false;
  };
};

var hasWinner = false;

var game = new Game();

game.addPlayer('Chet');
game.addPlayer('Pat');
game.addPlayer('Sue');

const maxDice = 6;
const maxAnswer = 10;
const wrongAnswer = 7;

do {

  game.roll(Math.floor(Math.random() * maxDice) + 1);

  if (Math.floor(Math.random() * maxAnswer) == wrongAnswer) {
    hasWinner = game.wrongAnswer();
  } else {
    hasWinner = game.wasCorrectlyAnswered();
  }

} while (!hasWinner);
