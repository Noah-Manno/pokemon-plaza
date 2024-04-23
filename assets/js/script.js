let pokemonSearchEl = $('#search')
let pokemonSubmitEl = $('#submit')

pokemonSubmitEl.on('click', handleSubmitPokemon)

function handleSubmitPokemon() {
    // Get the User Input Pokemon
    let newPokemonSearch = pokemonSearchEl.val()
    console.log(newPokemonSearch);
    // Grab the Search History From Local Storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // If it has not been searched before, add it to the search history and update storage
    if (!searchHistory.includes(newPokemonSearch)) {
        searchHistory.push(newPokemonSearch);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    handleFetchPokemonData(newPokemonSearch);
}

function handleFetchPokemonData(pokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    fetch(url) 
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
            return response.json();
    })
    .then(function(data) {
        localStorage.setItem('currentPokemonData', JSON.stringify(data));
        window.location.href = 'results.html'
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
}