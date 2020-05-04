const allShows = getAllShows()

function setup() {
    const allShows = getAllShows()
    console.log(allShows)
    appendToOptionShows(allShows)
    displayAllShows(allShows)
}

function getShows(id) {
    getData(`https://api.tvmaze.com/shows/${id}/episodes`, (allEpisodes) => {
        makePageForEpisodes(allEpisodes);
        searchTheInput(allEpisodes)
        appendToTheSelect(allEpisodes)
    })
}

const rootElem = document.getElementById("root");
let selectTwo = document.createElement("select");
let select = document.createElement("select");

function appendToOptionShows(arrayOfShows) {
    let optionTwo = document.createElement("option")
    optionTwo.text = "All shows"
    selectTwo.appendChild(optionTwo)
    optionTwo.setAttribute("value", 'all-shows')

    arrayOfShows.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });

    arrayOfShows.forEach(show => {
        let optionTwo = document.createElement('option')
        optionTwo.text = show.name
        optionTwo.setAttribute("value", `${show.id}`);
        selectTwo.appendChild(optionTwo)
    })


}

selectTwo.addEventListener('change', checkChoosenShowValue)

function checkChoosenShowValue(e) {
    let showValue = e.target.value
    console.log(showValue)
    secondDiv.innerHTML = ''

    if (showValue == "all-shows") {
        const allShows = getAllShows()
        displayAllShows(allShows)
    } else {
        showsDiv.innerHTML = ''
        getShows(showValue)
    }
}


function appendToTheSelect(objectValues) {

    while (select.firstChild) {
        select.firstChild.remove();
    }
    let option = document.createElement("option")
    option.text = "All episods"
    option.setAttribute("value", 'all-episods');
    select.appendChild(option)

    objectValues.forEach((element) => {

        let option = document.createElement("option")
        option.text = element.name + " " + episodeCode(element)
        select.appendChild(option)
        option.setAttribute("value", `${element.id}`);
    })

    select.addEventListener('change', checkChoosenValue)

    function checkChoosenValue(e) {
        // const id = select.options[select.selectedIndex].id
        const value = e.target.value
        if (value === ("All episods")) {
            makePageForEpisodes(objectValues)
        } else {
            const filteredEpisod = filterTheOption(objectValues, value)
            makePageForEpisodes(filteredEpisod)
        }
    }
}

// array and string 
//3 things for the function/ input(always a parameter)/ how many parameters and what data types / and output, whic his whatever it returns and the side effect
function filterTheOption(arrayOfEpisods, value) {
    return arrayOfEpisods.filter(episod => value === episod.id.toString())
}

const firstDiv = document.createElement("div");
const secondDiv = document.createElement("div");
const inputTag = document.createElement("input");
const pLabelTag = document.createElement("p");


rootElem.appendChild(firstDiv)
rootElem.appendChild(secondDiv)
firstDiv.appendChild(inputTag)
firstDiv.appendChild(pLabelTag)
firstDiv.appendChild(select)
firstDiv.appendChild(selectTwo)

inputTag.classList.add("input");
pLabelTag.classList.add("p-label-tag");
secondDiv.className = "cards row"
rootElem.className = "container"

function removePtagsFromTheShows(showsArrow) {

    // console.log(shows.summary)
    const openingP = showsArrow.summary.replace(/<p>/g, " ")
    // console.log(openingP)
    const allShowPs = openingP.replace(/<\/p>/g, " ")
    // console.log(allShowPs)
    return allShowPs

}

const showsDiv = document.createElement("div");

function displayAllShows(shows) {

    rootElem.appendChild(showsDiv)
    shows.forEach(show => {
        showsDiv.innerHTML += `
      <div class="all-show-info">
      <img class="show-image" src=${show.image.medium}>
      <div class="description">
      <p value=${show.id} class="p-show">${show.name}</p>
      <p class="summary"> ${removePtagsFromTheShows(show)}</p>
      <div class="show-side-bar">
      <p class="status">${show.status}</p>
      <p class="rating"><span>&#9733;</span> ${show.rating.average}</p>
      <p class="runtime">Runtime: ${show.runtime}</p>
      </div>
      </div>
      </div>
      
      
      `
    })
}



function displayingTag(value, episode) {
    pLabelTag.innerHTML = `Displaying ${value.length}/${episode.length}`
}

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
        searchTheInput(valueOfFilter, episodsObject)
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
    displayingTag(allEpisodesList, allEpisodesList)
    allEpisodesList.forEach((episod) => {
        secondDiv.innerHTML += `
        <div class="col-12 md-col-6 lg-col-3">
        <div class="each-card">
        <img class="image" src=${episod.image.medium}>
            <div class="description">
            <p class="titel">${episod.name}</p>
            <p class="episode-code">${episodeCode(episod)}</p>
            <p class="summary"> ${removePtags(episod)}</p>
            </div>
        </div>
        </div>
        `;
    });
}
window.onload = setup