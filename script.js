function setup() {
    const allEpisodes = getAllEpisodes();
    // console.log(allEpisodes)
    makePageForEpisodes(allEpisodes);
    searchTheInput(allEpisodes)
    // removePtags(allEpisodes)
    appendToTheSelect(allEpisodes)
    // displayChoosenValue(allEpisodes)
    console.log(allEpisodes)

}
const rootElem = document.getElementById("root");
let select = document.createElement("select");

function appendToTheSelect(objectValues) {
    let option = document.createElement("option")
    option.text = "All episods"
    select.appendChild(option)

    objectValues.forEach((element) => {
        let option = document.createElement("option")
        option.text = element.name + " " + episodeCode(element)
        select.appendChild(option)
        option.setAttribute("id", `${element.id}`);
    })

    // const arrayOfOptions = Array.from(select)
    // console.log('arrOfOptions', arrayOfOptions)
    select.addEventListener('change', checkChoosenValue)

    function checkChoosenValue(e) {
        const id = select.options[select.selectedIndex].id
        const value = e.target.value
        if (value === ("All episods")) {
            console.log(value)
            makePageForEpisodes(objectValues)
        } else {
            const filteredEpisod = filterTheOption(objectValues, id)
            // selected value includes() -> objectValues(object.name) 
            makePageForEpisodes(filteredEpisod)
        }
        console.log(typeof id)
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
        <div class="single-card lg-col-3">
        <p class="titel">${episod.name}</p>
        <p class="episode-code">${episodeCode(episod)}</p>
        <img class="image" src=${episod.image.medium}>
        <p class="summary"> ${removePtags(episod)}</p>
        </div>
        `;
    });
}

window.onload = setup;




// function setup() {
//     const allEpisodes = getAllEpisodes();
//     // console.log(allEpisodes)
//     makePageForEpisodes(allEpisodes);
//     searchTheInput(allEpisodes)
//     // removePtags(allEpisodes)
//     appendToTheSelect(allEpisodes)
//     // displayChoosenValue(allEpisodes)
//     console.log(allEpisodes)

// }
// const rootElem = document.getElementById("root");



// let select = document.createElement("select");

// function appendToTheSelect(objectValues) {
//     let option = document.createElement("option")
//     option.text = "All episods"
//     select.appendChild(option)
//     objectValues.forEach(element => {
//         let option = document.createElement("option")
//         option.text = element.name + " " + episodeCode(element)
//         select.appendChild(option)
//     })
//     // const arrayOfOptions = Array.from(select)
//     // console.log('arrOfOptions', arrayOfOptions)
//     select.addEventListener('change', checkChoosenValue)

//     function checkChoosenValue(e) {
//         const value = e.target.value
//         if (value === ("All episods")) {
//             makePageForEpisodes(objectValues)
//         } else {
//             const filteredEpisod = filterTheOption(objectValues, value)
//             // selected value includes() -> objectValues(object.name) 
//             makePageForEpisodes(filteredEpisod)
//         }
//     }
// }
// // array and string 
// //3 things for the function/ input(always a parameter)/ how many parameters and what data types / and output, whic his whatever it returns and the side effect
// function filterTheOption(arrayOfEpisods, selectedValue) {
//     return arrayOfEpisods.filter(episod => selectedValue.includes(`${episodeCode(episod)}`))
// }




// const firstDiv = document.createElement("div");
// const secondDiv = document.createElement("div");
// const inputTag = document.createElement("input");
// const pLabelTag = document.createElement("p");

// rootElem.appendChild(firstDiv)
// rootElem.appendChild(secondDiv)
// firstDiv.appendChild(inputTag)
// firstDiv.appendChild(pLabelTag)
// firstDiv.appendChild(select)

// inputTag.classList.add("input");
// pLabelTag.classList.add("p-label-tag");
// secondDiv.className = "cards row"
// rootElem.className = "container"

// function searchTheInput(episodsObject) {
//     function inputValue() {

//         let valueOfFilter = episodsObject.filter(episod => {
//             let lowerCaseSummary = episod.summary.toLowerCase();
//             let lowerCaseName = episod.name.toLowerCase();
//             let lowerCaseInput = inputTag.value.toLowerCase();
//             let episodeCodeowerCase = episodeCode(episod).toLowerCase()

//             if (lowerCaseSummary.indexOf(lowerCaseInput) > -1 || lowerCaseName.indexOf(lowerCaseInput) > -1 || episodeCodeowerCase.indexOf(lowerCaseInput) > -1) {
//                 return true
//             } else {
//                 return false
//             }
//         })
//         // console.log(valueOfFilter.length)
//         pLabelTag.innerHTML = `Displaying ${valueOfFilter.length}/${episodsObject.length}`
//         makePageForEpisodes(valueOfFilter)
//     }
//     inputTag.addEventListener('input', inputValue)

// }



// function episodeCode(episodObject) {
//     let episodSeason = episodObject.season;
//     let episodNumber = episodObject.number;

//     (episodSeason < 10) ? episodSeason = `0${episodSeason}`: null;
//     (episodNumber < 10) ? episodNumber = `0${episodNumber}`: null;

//     return `S${episodSeason}E${episodNumber}`;
// }

// function removePtags(objectEpisods) {
//     const openingP = objectEpisods.summary.replace(/<p>/g, " ")
//     const allPs = openingP.replace(/<\/p>/g, " ")
//     // console.log(allPs)
//     return allPs

// }

// function makePageForEpisodes(allEpisodesList) {
//     secondDiv.innerHTML = '';
//     allEpisodesList.forEach((episod) => {
//         secondDiv.innerHTML += `
//         <div class="single-card lg-col-3">
//         <p class="titel">${episod.name}</p>
//         <p class="episode-code">${episodeCode(episod)}</p>
//         <img class="image" src=${episod.image.medium}>
//         <p class="summary"> ${removePtags(episod)}</p>
//         </div>
//         `;
//     });
// }

// window.onload = setup;