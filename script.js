//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");

const inputDiv = document.createElement("div");
inputDiv.classList.add("input-div");
rootElem.appendChild(inputDiv);

const inputTag = document.createElement("input");
inputTag.classList.add("input");
inputDiv.appendChild(inputTag);

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
