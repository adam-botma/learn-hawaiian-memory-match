var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;


function setToNull () {

  firstCardClicked = null;
  secondCardClicked = null;
}

function noMatch () {
    firstCardClicked.classList.remove('hidden');
    secondCardClicked.classList.remove('hidden');
    setToNull();
  }

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden');
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;

  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    document.getElementById('gameCards').removeEventListener('click', handleClick);

    if (firstCardClasses === secondCardClasses) {
      console.log('match');
      document.getElementById('gameCards').addEventListener('click', handleClick);
      setToNull();
      matches++;
      console.log(matches);
      if(matches === maxMatches){
        document.getElementById('modal').classList.remove('hidden');
      }
    } else {
      console.log('no match');
      setTimeout(noMatch, 1500);
      document.getElementById('gameCards').addEventListener('click', handleClick);
    }

  }


}

document.getElementById('gameCards').addEventListener('click', handleClick);
