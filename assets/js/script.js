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
        localStorage.setItem('searchHistory', searchHistory);
    }
    handleFetchPokemonData(newPokemonSearch);
}

function handleFetchPokemonData(pokemon) {
    let url = ""
}