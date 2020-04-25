function setup() {
    const allEpisodes = getAllEpisodes();
    // console.log(allEpisodes)
    makePageForEpisodes(allEpisodes);
    searchTheInput(allEpisodes)
    // removePtags(allEpisodes)
}
const rootElem = document.getElementById("root");

const firstDiv = document.createElement("div");
const secondDiv = document.createElement("div");
const inputTag = document.createElement("input");
const pLabelTag = document.createElement("p");
rootElem.appendChild(firstDiv)
rootElem.appendChild(secondDiv)
firstDiv.appendChild(inputTag)
firstDiv.appendChild(pLabelTag)

inputTag.classList.add("input");
pLabelTag.classList.add("p-label-tag");
secondDiv.classList.add("cards");
secondDiv.classList.add("col-12");

function searchTheInput(episodsObject) {

    function inputValue() {

        let valueOfFilter = episodsObject.filter(episod => {
            let lowerCaseSummary = episod.summary.toLowerCase();
            let lowerCaseName = episod.name.toLowerCase();
            let lowerCaseInput = inputTag.value.toLowerCase();
            let episodeCodeowerCase = episodeCode(episod).toLowerCase()


            if (lowerCaseSummary.indexOf(lowerCaseInput) > -1 || lowerCaseName.indexOf(lowerCaseInput) > -1 || episodeCodeowerCase.indexOf(lowerCaseInput) > -1) {
                return true
            } else {
                return false
            }
        })
        // console.log(valueOfFilter.length)
        pLabelTag.innerHTML = `Displaying ${valueOfFilter.length}/${episodsObject.length}`
        makePageForEpisodes(valueOfFilter)
    }
    inputTag.addEventListener('input', inputValue)

}



function episodeCode(episodObject) {
    let episodSeason = episodObject.season;
    let episodNumber = episodObject.number;

    (episodSeason < 10) ? episodSeason = `0${episodSeason}`: null;
    (episodNumber < 10) ? episodNumber = `0${episodNumber}`: null;

    return `S${episodSeason}E${episodNumber}`;
}

function removePtags(objectEpisods) {
    const openingP = objectEpisods.summary.replace(/<p>/g, " ")
    const allPs = openingP.replace(/<\/p>/g, " ")
    console.log(allPs)
    return allPs

}

function makePageForEpisodes(allEpisodesList) {
    secondDiv.innerHTML = '';
    allEpisodesList.forEach((episod) => {
        secondDiv.innerHTML += `
        <div class="single-card col-2">
        <p class="titel">${episod.name}</p>
        <p class="episode-code">${episodeCode(episod)}</p>
        <img class="image" src=${episod.image.medium}>
        <p class="summary"> ${removePtags(episod)}</p>
        </div>
        `;
    });
}

window.onload = setup;