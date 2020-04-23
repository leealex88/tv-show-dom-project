//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
// console.log(allEpisodes)

function setup() {
  makePageForEpisodes(allEpisodes);
}
// console.log(allEpisodes)
const inputDiv = document.getElementById('input')
const inputTag = document.createElement("input");
inputTag.classList.add("input");
inputDiv.appendChild(inputTag);

const rootElem = document.getElementById("root");
const allMovieCards = document.getElementsByClassName("single-card")

function searchInput(e) {
  const searchValue = e.target.value.toLowerCase()
  const check = Array.from(allMovieCards).filter(element => element.textContent.toLowerCase().includes(searchValue))
  //clean the context of the div
  rootElem.textContent = ''
  //assigne the searched values to the div 
  check.forEach(element => rootElem.appendChild(element))
}

inputTag.addEventListener("input", searchInput)


function makePageForEpisodes(episodeList) {
  const movieLiest = episodeList.map((episod) => {
    //single card
    const divCard = document.createElement("div");
    divCard.classList.add("single-card");
    rootElem.appendChild(divCard);
    // h3 - titel tag / the episod number to be added
    const pTag = document.createElement("p");
    pTag.classList.add("titel");
    divCard.appendChild(pTag);
    pTag.innerHTML = episod.name;
    //sesonCode episode tag
    const pCodeTag = document.createElement("p");
    pCodeTag.classList.add("episode-code");
    divCard.appendChild(pCodeTag);
    // image div
    const imageDiv = document.createElement("img");
    imageDiv.classList.add("image");
    divCard.appendChild(imageDiv);
    imageDiv.src = episod.image.medium;
    // description
    const pSummary = document.createElement("p");
    pSummary.classList.add("summary");
    divCard.appendChild(pSummary);
    pSummary.innerHTML = episod.summary;

    if (episod.season < 10 && episod.number < 10) {
      pCodeTag.innerHTML = `S0${episod.season}E0${episod.number}`;
    } else {
      pCodeTag.innerHTML = `S${episod.season}E${episod.number}`;
    }
  });
}

window.onload = setup;