// Container where content will go, declared globally
let container = $('#container')
// Grab Search History From Local Storage
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
console.log(history)
// check if there is anything in search history
if (history.length === 0) {
    let noData = $('<h2>').text('No Pokemon Selected Yet')
    let buttonContainer = $('<div class="button-container">')
    let returnHome = $('<button class="return-home">').text('Return Home')
    returnHome.on('click', function() {
        window.location.href = 'index.html'
    })
    buttonContainer.append(returnHome);
    container.append(noData);
    container.append(buttonContainer)
} 
// if there is something in search history, append those tabs to the page
if (history.length !== 0) {
    handleAddingPokedexTabs(history);
}

function handleAddingPokedexTabs(history) {
    // create the containers for the tabs to go in
let tabContainer = $('<div class="col s12">')
let tabList = $('<ul id="tabs" class="tabs">')
tabContainer.append(tabList);
container.append(tabContainer)

    // add the tabs for each pokemon in search history
    for (let i = 0; i < history.length; i++) {
        let pokemon = history[i];
        let newTab = $('<li class="tab col s12">')
        let newLink = $(`<a href="#${pokemon}">${pokemon}</a>`)
        newLink.on('click', function(){
            let instructions = $('#instructions')
            instructions.css('display', 'none')
        })
        newTab.append(newLink);
        tabList.append(newTab);
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
        fetch(url) 
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
                return response.json();
        })
        .then(function(data) {
            let newPage = $(`<div id="${pokemon}" class="col s12">`)
            newPage.css('display','none')
            if (i == 0) {
                newLink.addClass('active')
                newPage.addClass('active')
            } 
            let resultsContainer = $('<div class="results-container row">')
            let basicInfo = $('<div class="basic-info col s8 offset-s2 m5 offset-m0 l3">')
            let spriteContainer = $('<div class="sprite-container">')
            let sprite = $(`<img class="sprite" src="${data.sprites.front_default}">`)
            spriteContainer.append(sprite);
            basicInfo.append(spriteContainer);
            resultsContainer.append(basicInfo);
            newPage.append(resultsContainer);
            container.append(newPage)
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
    }  
}