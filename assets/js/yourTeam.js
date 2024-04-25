const noPokemonChosenEl = $('#no-results')
const yourTeam = JSON.parse(localStorage.getItem('yourTeam'));
if (yourTeam) {
    handleAddingYourTeam(yourTeam)
} else {
    noPokemonChosenEl.css('display', 'block')
}

function handleAddingYourTeam(yourTeam) {
    for (let index = 0; index < yourTeam.length; index++) {
        const pokemon = yourTeam[index];
        handleFetchingYourTeamData(pokemon)
        .then(function(data) {
            let container = $('<div class="col s12 m6 team-member>')
            let pokemonResults = $('<div class="pokemon-results-container row">')
            let imgContainer = $('<div class="col s4 img-container">')
            let img = $(`<img class="sprite-yourTeam" alt="${data.name} sprite" src='${data.sprites.front_default}'>`)
            let additionalContainer = $('<div class="col s8 additional-info">')
            let pokemonName = $(`<h2>${data.name}</h2>`)
        })
        
    }
}

function handleFetchingYourTeamData(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            return data;
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}