// declaring HTML elements
const resultsContainerEl = $('#results')
const noPokemonChosenEl = $('#no-results')

// declaring front and back links
const back = $('#back')
const forward = $('#forward')
const current = $('#current')

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
current.text(data.name)

let addToTeamButton = $('#add-to-team')
let checkMark = $('#checkIcon')
const teamIsFull = $('#team-is-full')

let yourTeam = JSON.parse(localStorage.getItem('yourTeam')) || [];
if (yourTeam.includes(data.name)) {
    checkMark.css('display', 'inline')
}
// add functionality to button
addToTeamButton.on('click', function() {
    if(!yourTeam.includes(data.name) && yourTeam.length < 6) {
    yourTeam.unshift(data.name)
    localStorage.setItem('yourTeam', JSON.stringify(yourTeam))
    checkMark.css('display', 'inline')
    }
    if(yourTeam.length > 5 && !yourTeam.includes(data.name)) {
        teamIsFull.css('display', 'inline')
    }
})

// create the type icons
let types = data.types
types.forEach(type => {
    let typeName = type.type.name;
    let newType = $(`<h3 class="${typeName} type col s6">${typeName}</h3>`);
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

function handleFrontAndBackLinks(data) {
    let id = data.id;
    backId = id - 1;
    frontId = id + 1;

    handleFetchingFrontAndBackData(backId)
        .then(function(backData) {
            backName = backData.name
            back.text(`<-${backName}`)
            back.on('click', function() {
                if (!searchHistory.includes(backData.name)) {
                searchHistory.unshift(backName);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
                }
                // fetch the data for that pokemon and update the page
                let data = handleFetchingData(backName);
                handleAddingPokemonData(data)
            })
        })
        .catch(function(error) {
            console.error('Error fetching back data:', error);
        });

    handleFetchingFrontAndBackData(frontId)
        .then(function(frontData) {
            frontName = frontData.name
            forward.text(`${frontName}->`);
            forward.on('click', function() {
                if (!searchHistory.includes(frontData.name)) {
                searchHistory.unshift(frontName);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
                }
                // fetch the data for that pokemon and update the page
                let data = handleFetchingData(frontName);
                handleAddingPokemonData(data)
            })
        })
        .catch(function(error) {
            console.error('Error fetching front data:', error);
        });
}

function handleFetchingFrontAndBackData(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
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
// add the pokemon data if the user has inputted anything yet, or there is a search in local storage.
// If not, display a message asking the user to search a pokemon.
if (data) {
    noPokemonChosenEl.css('display', 'none');
    handleAddingPokemonData(data);
    handleFrontAndBackLinks(data)
} else {
    resultsContainerEl.css('display', 'none');
    noPokemonChosenEl.css('display', 'block');
}

if (searchHistory) {
    handleAddingTabs(searchHistory);
}
