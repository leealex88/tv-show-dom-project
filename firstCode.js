//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
// console.log(allEpisodes)

function setup() {
  makePageForEpisodes(allEpisodes);
  allMovieCards = Array.from(document.getElementsByClassName("single-card"));
}

const inputDiv = document.getElementById("input");
const inputTag = document.createElement("input");
inputTag.classList.add("input");
inputDiv.appendChild(inputTag);
const pHowMany = document.createElement("p");
pHowMany.classList.add("p-wow-many");
inputDiv.appendChild(pHowMany);
pHowMany.textContent = `Displaying from ${allEpisodes.length}`;
const rootElem = document.getElementById("root");
let allMovieCards; //Array with all all movie cards

const option = document.createElement("SELECT");
inputDiv.appendChild(option);
option.add("ols");

function searchInput(e) {
  const searchValue = e.target.value.toLowerCase();
  const check = allMovieCards.filter((element) =>
    element.textContent.toLowerCase().includes(searchValue)
  );
  console.log(check);
  pHowMany.textContent = `Displaying ${check.length} from ${allEpisodes.length} episods`;
  console.log(check.length);
  //clean the context of the div
  rootElem.textContent = "";
  //assigne the searched values to the div
  check.forEach((element) => rootElem.appendChild(element));
}

inputTag.addEventListener("input", searchInput);

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