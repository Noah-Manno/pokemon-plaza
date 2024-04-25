const noPokemonChosenEl = $('#no-results');
const yourTeamContainer = $('#team-container');
const yourTeam = JSON.parse(localStorage.getItem('yourTeam'));
console.log(yourTeam);

if (yourTeam) {
    handleAddingYourTeam(yourTeam);
} else {
    noPokemonChosenEl.css('display', 'block');
}

function handleAddingYourTeam(yourTeam) {
    const promises = yourTeam.map(pokemon => handleFetchingYourTeamData(pokemon));

    Promise.all(promises)
        .then(dataArray => {
            dataArray.forEach(data => {
                let container = $('<div class="col s12 l6 team-member">');
                let pokemonResults = $('<div class="pokemon-results-container row">');
                let imgContainer = $('<div class="col s4 img-container">');
                let img = $(`<img class="sprite-yourTeam" alt="${data.name} sprite" src='${data.sprites.front_default}'>`);
                let additionalContainer = $('<div class="col s8 additional-info">');
                let pokemonName = $(`<h2>${data.name}</h2>`);
                let typeContainer = $('<div class="types">')
                let types = data.types
                types.forEach(type => {
                    let typeName = type.type.name;
                    let newType = $(`<h3 class="${typeName} type">${typeName}</h3>`);
                // append it to the container
                    typeContainer.append(newType);
                });
                additionalContainer.append(pokemonName);
                additionalContainer.append(typeContainer)
                imgContainer.append(img);
                pokemonResults.append(imgContainer);
                pokemonResults.append(additionalContainer);
                container.append(pokemonResults);
                yourTeamContainer.append(container);

                // Adding a Remove Button
                let removeButton = $('<button class="remove">').text('Release Pokemon?');
                removeButton.on('click', function() {
                    yourTeam = yourTeam.filter(p => p !== data.name); // Filter out the clicked Pokémon
                    localStorage.setItem('yourTeam', JSON.stringify(yourTeam)); // Update the team in localStorage
                    container.remove(); // Remove the Pokémon from the UI
                });

                pokemonResults.append(removeButton);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function handleFetchingYourTeamData(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}