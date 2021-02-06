const selectEl = document.querySelector('.dog-select');

selectEl.addEventListener('change', (event) => {
  const result = document.querySelector('.result');
  let exportLink = event.target.value;
  function setLocation(curLoc) {
    location.href = curLoc;
    location.hash = curLoc;
  }
  setLocation(`/${exportLink}`);
});