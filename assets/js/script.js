var cardDeck = ['react-logo', 'react-logo1', 'php-logo', 'php-logo1', 'node-logo', 'node-logo1', 'mysql-logo', 'mysql-logo1', 'html-logo', 'html-logo1', 'gitHub-logo', 'gitHub-logo1', 'js-logo', 'js-logo1', 'css-logo', 'css-logo1', 'docker-logo','docker-logo1']
var theCards = document.querySelectorAll('.card-front');
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var accuracy;
var firstClick = new Audio('../assets/sounds/bling.ogg');
var matchMade = new Audio('../assets/sounds/achieved.ogg');
var nonMatch = new Audio('../assets/sounds/magic.ogg');
var startScreen = document.getElementById('start-modal');


document.onkeypress = function (e){
  if(e.keyCode == 32){
    console.log(e);
    startScreen.classList.add('hidden');
  }
}


shuffleDeck();
displayCards();

document.getElementById('instructions-button').addEventListener('click', displayInstructions);
document.getElementById('back-button').addEventListener('click', undisplayInstructions);

function undisplayInstructions (){
  document.getElementById('instructions-modal').classList.add('hidden');
  startScreen.classList.remove('hidden');
}


function displayInstructions(){
  document.getElementById('instructions-modal').classList.remove('hidden');
  startScreen.classList.add('hidden');

}


function resetGame () {
  matches = 0;
  attempts = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  document.getElementById('modal').classList.add('hidden');
}


function shuffleDeck ()  {
    for (var i = cardDeck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
    }
  }

function displayCards () {
   var theCards = document.querySelectorAll('.card-front');
   for (var c=0; c < theCards.length; c++){
    theCards[c].className = 'card-front '+cardDeck[c];
}
}


function resetCards () {
  shuffleDeck();
  displayCards();
  var hiddenCards = document.querySelectorAll('.card-back');
  for (var i = 0 ; i < hiddenCards.length ; i++){
    hiddenCards[i].classList.remove('hidden');
  }


}

function calculateAccuracy (matches, attempts) {
  if (!attempts){
    return '0%';
  } else {
     var result = Math.round(100 * (matches / attempts)) + '%'
      return result;
    }

}

function bigGreen () {
  document.getElementById('gameCards').style.border = '';
}

function displayStats () {
  document.getElementById('games-played').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('matches').textContent = matches;
  document.getElementById('accuracy').textContent = calculateAccuracy(matches, attempts);
}

function setToNull () {

  firstCardClicked = null;
  secondCardClicked = null;
}

function noMatch () {

    firstCardClicked.classList.remove('hidden');
    secondCardClicked.classList.remove('hidden');
    setToNull();
  document.getElementById('gameCards').style.border = '';

  }

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden');
  if(!firstCardClicked){
    firstClick.play();
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    if (firstCardClasses.includes('1')) {
      firstCardClasses = firstCardClasses.substring(0, firstCardClasses.length - 1);
    }

  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    if (secondCardClasses.includes('1')) {
      secondCardClasses = secondCardClasses.substring(0, secondCardClasses.length - 1);
    }
    document.getElementById('gameCards').removeEventListener('click', handleClick);

    if (firstCardClasses === secondCardClasses) {
      matchMade.play();
      document.getElementById('gameCards').style.border = 'solid green 6px';
      setTimeout(bigGreen, 1250);
      document.getElementById('gameCards').addEventListener('click', handleClick);
      setToNull();
      matches++;
      attempts++;
      displayStats();
      if(matches === maxMatches){

        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modalAttempts').textContent = attempts;
        document.getElementById('modalAccuracy').textContent = calculateAccuracy(matches, attempts);
      }
    } else {
      nonMatch.play();
      attempts++;
      displayStats();
      document.getElementById('gameCards').style.border = 'solid red 6px';
      setTimeout(noMatch, 1250);

      document.getElementById('gameCards').addEventListener('click', handleClick);
    }

  }


}

document.getElementById('gameCards').addEventListener('click', handleClick);
document.getElementById('modal').addEventListener('click', resetGame);
