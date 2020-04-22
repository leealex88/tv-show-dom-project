//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // episodeCode(allEpisodes);
  // console.log("episods", allEpisodes);
}
const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  const movieLiest = episodeList.map((episod) => {
    console.log(episod);
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

// function episodeCode(allEpisodes) {
//   const createCode = allEpisodes.map((episod) => {});
//   console.log(createCode);
// }
window.onload = setup;

// const displayEpisod = allEpisodes.map((episod) => {
//
//   let paragraph = document.createElement("p");
//   card.appendChild(paragraph);
//   paragraph.innerHTML = episod.name;
//   doc.appendChild(paragraph);
//   let paragraph1 = document.createElement("p");
//   card.appendChild(paragraph1);
//   paragraph1.innerHTML = `the season number ${episod.season}`;
//   doc.appendChild(paragraph1);
//   let paragraph3 = document.createElement("p");
//   card.appendChild(paragraph3);
//   paragraph3.innerHTML = `the episode number ${episod.number}`;
//   doc.appendChild(paragraph3);
// });
// console.log(allEpisodes);
