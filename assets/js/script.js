let pokemonSearchEl = $('#search')
let pokemonSubmitEl = $('#submit')

pokemonSubmitEl.on('click', handleSubmitPokemon)

function handleSubmitPokemon() {
    // Get the User Input Pokemon
    let newPokemonSearch = pokemonSearchEl.val()
    if (newPokemonSearch) {
    console.log(newPokemonSearch);
    // Grab the Search History From Local Storage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // If it has not been searched before, add it to the search history and update storage
        let url = `https://pokeapi.co/api/v2/pokemon/${newPokemonSearch}/`
        fetch(url) 
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
                return response.json();
        })
        .then(function(data) {
            if (!searchHistory.includes(newPokemonSearch)) {
                searchHistory.unshift(newPokemonSearch);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            }
            localStorage.setItem('currentPokemonData', JSON.stringify(data));
            window.location.href = 'results.html'
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}
}

