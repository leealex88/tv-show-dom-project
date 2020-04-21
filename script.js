//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  const displayAllEpisods = allEpisodes.map((episod) => {
    return episod.id;
  });
  return;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

let myElement = document.querySelector("#root");
let paragraph = document.createElement("p");
myElement.appendChild(paragraph);
console.log(paragraph);
paragraph.innerText = setup();
