// declaring HTML elements
const resultsContainerEl = $('#results')
const noPokemonChosenEl = $('#no-results')

// declaring basic information elements
const sprite = $('#sprite')
const pokemonName = $('#pokemon-name')
const typeContainerEl = $('#type-container')
const abilitiesListEl = $('#abilities-list')

//declaring detail information elements
const hpElVal = $('#hpVal')
const hpEl = $('#hp')
const attackElVal = $('#attackVal')
const attackEl = $('#attack')
const defenseElVal = $('#defenseVal')
const defenseEl = $('#defense')
const spAtkElVal = $('#spAtkVal')
const spAtkEl = $('#spAtk')
const spDefElVal = $('#spDefVal')
const spDefEl = $('#spDef')
const speedElVal = $('#speedVal')
const speedEl = $('#speed')
const movesTableBodyEl = $('#moves-table')

// declaring the tabs list
let tabs = $('#tabs')

// Grab pokemon data from local storage 
let data = JSON.parse(localStorage.getItem('currentPokemonData'))
let serchHistory = JSON.parse(localStorage.getItem('searchHistory'))
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
    let newType = $(`<h3 class="${typeName} type">${typeName}</h3>`);
// append it to the container
    typeContainerEl.append(newType);
});
// adding abilities to the list
let abilities = data.abilities;
abilities.forEach(ability => {
    let abilityName = ability.ability.name;
    let newAbility = $(`<li>${abilityName}</li>`);
//append it to the list
    abilitiesListEl.append(newAbility);
});
let stats = data.stats
hpElVal.text(stats[0].base_stat)
attackElVal.text(stats[1].base_stat)
defenseElVal.text(stats[2].base_stat)
spAtkElVal.text(stats[3].base_stat)
spDefElVal.text(stats[4].base_stat)
speedElVal.text(stats[5].base_stat)
hpEl.attr('value', `${stats[0].base_stat}`)
attackEl.attr('value', `${stats[1].base_stat}`)
defenseEl.attr('value', `${stats[2].base_stat}`)
spAtkEl.attr('value', `${stats[3].base_stat}`)
spDefEl.attr('value', `${stats[4].base_stat}`)
speedEl.attr('value', `${stats[5].base_stat}`)

// grab the moves from the data 
let moves = data.moves
moves.sort((a, b) => {
    // First, sort by move learn method
    if (a.version_group_details[0].move_learn_method.name !== b.version_group_details[0].move_learn_method.name) {
        return a.version_group_details[0].move_learn_method.name.localeCompare(b.version_group_details[0].move_learn_method.name);
    } else {
        // If move learn method is the same, sort by level learned at
        return a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at;
    }
});
moves.forEach(move => {
    let moveName = move.move.name;
    let level = move.version_group_details[0].level_learned_at;
    let method = move.version_group_details[0].move_learn_method.name;
    let tr = $('<tr>');
    let moveTd = $('<td>').text(moveName);
    let levelTd = $('<td>').text(level);
    let methodTd = $('<td>').text(method)
    tr.append(moveTd);
    tr.append(levelTd);
    tr.append(methodTd);
    movesTableBodyEl.append(tr);
});
}


function handleAddingTabs(searchHistory) {
    for (let index = 0; index < searchHistory.length; index++) {
        const pokemon = searchHistory[index];
        let newTab = $(`<li class="tab col s12">`)
        let newLink = $(`<a href="#${pokemon}">${pokemon}</a>`)
        newTab.append(newLink);
        newTab.on('click', function () {
            // Remove the tab and move it to the top of the tabs list
            newTab.detach().prependTo(tabs);
            // Update history to move the clicked item to the top
            searchHistory.splice(index, 1);
            searchHistory.unshift(pokemon);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
            // fetch the data for that pokemon and update the page
            let data = handleFetchingData(pokemon);
            handleAddingPokemonData(data)
        });
        tabs.append(newTab);
    }
}

// add the pokemon data if the user has inputted anything yet, or there is a search in local storage.
// If not, display a message asking the user to search a pokemon.
if (data) {
    noPokemonChosenEl.css('display', 'none');
    handleAddingPokemonData(data);
} else {
    resultsContainerEl.css('display', 'none');
    noPokemonChosenEl.css('display', 'block');
}

if (searchHistory) {
    handleAddingTabs(searchHistory);
}
