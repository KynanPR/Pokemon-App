// Setup IIFE to protect pokemonList
// Create pokemonRepository object with properies of add & getAll functions
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Create function to add pokemon to pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Create function that returns pokemonList
  function getAll() {
    return pokemonList;
  }

  // Create function to add pokemon button item to DOM and display on page
  function addListItem(pokemon) {
    let pokemonList = $('.main-list');
    let button = $('<button></button>')
        .addClass('list-group-item text-center')
        .addClass('btn btn-outline-dark mb-3 pokemon-list-item')
        .attr('data-toggle', 'modal')
        .attr('role', 'listItem')
        .attr('type', 'button')
        .attr('data-target', '#pokemonModal')
        .text(makeProper(pokemon.name, true))
        .on({
        click: () => {
            showDetails(pokemon);
          }
      });
    pokemonList.append(button);
  }

  // To show details of clicked pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
  }

  // Implement the modal
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    console.log(pokemon.name);

    modalTitle.empty();
    modalBody.empty();
    let pokemonName = $('<h2>' + makeProper(pokemon.name, true) + '</h2>');

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', pokemon.imageUrl);

    modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
    modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
    modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
    modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal

  }

  // Fetch base pokemon list from API and add each one to pokemonList
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function(error) {
      console.error(error);
    });
  }

  // Fetch and load details of given pokemon object
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function(error) {
      console.error(error);
    });
  }

  // Make above delcared functions the properties of pokemonRepository
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Fetch pokemon from API then add them to DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function makeProper(text, everyWord) {
  let wordList = text.split(' ');
  function capitaliseWord(word) {
    let restOfWord = word.slice(1);
    return word.charAt(0).toUpperCase() + restOfWord;
  }
  if (everyWord) {
    wordList.forEach((element, index) => wordList[index] = capitaliseWord(element));
  } else {
    wordList[0] = capitaliseWord(wordList[0]);
  }
  let properText = wordList.join(' ');
  return properText;
}
