function setup() {
    // const allEpisodes = getAllEpisode
    getShowsData('https://api.tvmaze.com/shows', (allShows) => {
        // console.log('all', allShows)
        appendToOptionShows(allShows)
        getShows(allShows[0].id)
    })

}

function getShows(id) {
    getData(`https://api.tvmaze.com/shows/${id}/episodes`, (allEpisodes) => {
        makePageForEpisodes(allEpisodes);
        searchTheInput(allEpisodes)
        appendToTheSelect(allEpisodes)
        // console.log(allEpisodes)
    })
}

const rootElem = document.getElementById("root");
let selectTwo = document.createElement("select");
let select = document.createElement("select");

function appendToOptionShows(arrayOfShows) {
    // let optionTwo = document.createElement("option")
    // optionTwo.text = "All shows"
    // selectTwo.appendChild(optionTwo)
    // optionTwo.setAttribute("id", 'all-shows');

    arrayOfShows.forEach(show => {
        let optionTwo = document.createElement('option')
        optionTwo.text = show.name
        optionTwo.setAttribute("id", `${show.id}`);
        selectTwo.appendChild(optionTwo)
    })

}

selectTwo.addEventListener('change', checkChoosenShowValue)

function checkChoosenShowValue() {
    const idShow = selectTwo.options[selectTwo.selectedIndex].id
    getShows(idShow)
    console.log(idShow)
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
        // console.log('game of t. element', element)
        let option = document.createElement("option")
        option.text = element.name + " " + episodeCode(element)
        select.appendChild(option)
        option.setAttribute("value", `${element.id}`);
    })

    // const arrayOfOptions = Array.from(select)
    // console.log('arrOfOptions', arrayOfOptions)
    select.addEventListener('change', checkChoosenValue)

    function checkChoosenValue(e) {
        // const id = select.options[select.selectedIndex].id
        const id = e.target.value
        console.log('id', id)
        if (id === ("All episods")) {
            makePageForEpisodes(objectValues)
        } else {
            const filteredEpisod = filterTheOption(objectValues, id)
            // selected value includes() -> objectValues(object.name) 
            makePageForEpisodes(filteredEpisod)
        }
    }
}

// array and string 
//3 things for the function/ input(always a parameter)/ how many parameters and what data types / and output, whic his whatever it returns and the side effect
function filterTheOption(arrayOfEpisods, id) {
    return arrayOfEpisods.filter(episod => id === episod.id.toString())
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
    // console.log(allPs)
    return allPs

}

function makePageForEpisodes(allEpisodesList) {
    secondDiv.innerHTML = '';
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