
function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden');
}

document.getElementById('gameCards').addEventListener('click', handleClick);
