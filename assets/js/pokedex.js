// declaring HTML elements
const resultsContainerEl = $('#results')
const noPokemonChosenEl = $('#no-results')

// declaring basic information elements
const sprite = $('#sprite')
const pokemonName = $('#pokemon-name')
const typeContainerEl = $('#type-container')
const abilitiesContainerEl = $('#abilities-container')
const abilitiesListEl = $('#abilities-list')

//declaring detail information elements
const statsListEl = $('#stats-list')
const hpListItemEl = $('#hpListItem')
const attackListItemEl = $('#attackListItem')
const defenseListItemEl = $('#defenseListItem')
const spAtkListItemEl = $('#spAtkListItem')
const spDefListItemEl = $('#spDefListItem')
const speedListItemEl = $('#speedListItem')
const movesTableBodyEl = $('#moves-table')

// Grab pokemon data from local storage 
let data = JSON.parse(localStorage.getItem('currentPokemonData'))

// Adds the pokemon data to the page
function handleAddingPokemonData(data) {
    console.log(data)
// Add the pokemon sprite
sprite.attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`)
// Add the pokemon's name
pokemonName.text(data.name)
// create the type icons
let types = data.types
types.forEach(type => {
    let typeName = type.type.name;
    let newType = $(`<h3 class="${typeName} col s6 type">${typeName}</h3>`);
    typeContainerEl.append(newType);
});
}

// add the pokemon data if the user has inputted anything yet, or there is a search in local storage.
// If not, display a message asking the user to search a pokemon.
if (data) {
    noPokemonChosenEl.css('display', 'none')
    handleAddingPokemonData(data)
    
} else {
    resultsContainerEl.css('display', 'none')
}
