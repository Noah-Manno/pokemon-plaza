let pokemonSearchEl = $('#search')
let pokemonSubmitEl = $('#submit')
// Grab the Search History From Local Storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

pokemonSubmitEl.on('click touchstart', handleSubmitPokemon)

function handleSubmitPokemon() {
    // Get the User Input Pokemon
    let newPokemonSearch = pokemonSearchEl.val()
    // Check if there is any input in the search bar
    if (newPokemonSearch) {
    console.log(newPokemonSearch);
    handleFetchingData(newPokemonSearch)
}
}
function handleFetchingData(newPokemonSearch) {
let url = `https://pokeapi.co/api/v2/pokemon/${newPokemonSearch}/`
        fetch(url) 
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
                return response.json();
        })
        .then(function(data) {
            // if the fetch request returns anything check if the pokemon is in search history already
            // if it isn't in search history, add it. 
            if (!searchHistory.includes(data.name)) {
                searchHistory.unshift(data.name);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            }
            // update the currentPokemonData with the user search input and redirect to the results page
            localStorage.setItem('currentPokemonData', JSON.stringify(data));
            window.location.href = 'results.html'
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}


//RANDOMIZE THE CAROUSEL POKEMON
  // Generate a random number between 1 and 9
  const randomId = Math.floor(Math.random() * 590) + 1;

  // Update the source of the image for each carousel item based on the randomly generated ID
  const carouselItems = document.querySelectorAll('.carousel-item');
  carouselItems.forEach((item, index) => {
      const newImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId + index}.png`;
      const image = item.querySelector('img');
      image.setAttribute('src', newImageUrl);
      item.setAttribute('href', `#${randomId + index}!`);
      item.setAttribute('id', `pokemon${index + 1}`);
  });