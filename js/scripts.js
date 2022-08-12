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
    let name = pokemon.name;
    let writeList = document.querySelector('.main-list');
    let listItem = document.createElement('li');
    let listItemButton = document.createElement('button');

    listItemButton.innerText = makeProper(name);
    listItemButton.classList.add('main-list__button');
    listItemButton.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
    listItem.appendChild(listItemButton);
    writeList.appendChild(listItem);
  }

  // To show details of clicked pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      properName = makeProper(pokemon.name, true);

      // Create container div for detail elements
      let detailContainer = document.createElement('div');
      detailContainer.classList.add('modal-grid');

      // Create containers for text and images to allow grid layout
      let textContainer = document.createElement('div');
      textContainer.id = 'modal-text-container';
      let imageContainer = document.createElement('div');
      imageContainer.id = 'modal-image-container';

      // Create elements for pokemon details
      let nameElement = document.createElement('p');
      nameElement.innerText = `Pokemon Name - ${properName}`;

      let heightElement = document.createElement('p');
      heightElement.innerText = `Pokemon Height - ${pokemon.height}`;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.src = pokemon.imageUrl;
      imageElement.alt = 'Default front image of Pokemon';

      // Append detail elements onto container div
      textContainer.appendChild(nameElement);
      textContainer.appendChild(heightElement);
      imageContainer.appendChild(imageElement);
      detailContainer.appendChild(textContainer);
      detailContainer.appendChild(imageContainer);

      // Create Modal with container as content argument
      modals.showModal(properName, detailContainer);

    });
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
  };
})();

// Fetch pokemon from API then add them to DOM
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function getCuteMessage(height) {
  return height <= 0.5 ? '<i> - So small and cute!</i>' : '';
}

// Form validation IIFE
let formValidation = (function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  // Generic error message function
  function formShowErrorMessage(input, message) {
    let container = input.parentElement;
    let error = container.querySelector('.error-message');

    if (error) {
      container.removeChild(error);
    }

    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  // Basic email validation
  function formValidateEmail() {
    let value = emailInput.value;

    // Check for empty email
    if (!value) {
      formShowErrorMessage(emailInput, 'Email is a required field.');
      return false;
    }
    // Check for @ sign
    if (value.indexOf('@') === -1) {
      formShowErrorMessage(emailInput, 'Invalid email address.');
      return false;
    }

    formShowErrorMessage(emailInput, null);
  }

  // Basic password validation
  function formValidatePassword() {
    let value = passwordInput.value;

    // Check for empty password
    if (!value) {
      formShowErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
    // Check for password length
    if (value.length < 8) {
      formShowErrorMessage(passwordInput, 'Password must be at least 8 characters long.');
      return false;
    }

    formShowErrorMessage(passwordInput, null);
    return true;
  }

  function formValidateForm() {
    let isValidEmail = formValidateEmail();
    let isValidPassword = formValidatePassword();
    return isValidEmail && isValidPassword;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (formValidateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', formValidateEmail);
  passwordInput.addEventListener('input', formValidatePassword);
})();

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

// Modal IIFE
let modals = (function() {
  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject;

  // Modal functionality
  function showModal(title, content) {

    // Clear existing content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add new content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    if (typeof content === 'string') {
      contentElement.innerText = content;
    } else {
      contentElement.appendChild(content);
    }

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Hide Modal function
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  // Dialog functionality
  function showDialog(title, text, saftyFocus) {
    showModal(title, text);

    let modal = modalContainer.querySelector('.modal');

    // Create confirm button
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    // Create cancel button
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    // Append buttons to Modal
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    let focusButton = saftyFocus ? cancelButton : confirmButton;
    focusButton.focus();

    // Return promise - Resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset
        hideModal();
        resolve();
      });
      dialogPromiseReject = reject;
    });
  }

  // Add click event listener to Show Modal button
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Title!', 'Content innit');
  });

  // Add click event listener to Show Dialog button
  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure?', false).then(function() {
      alert('Confirmed');
    }, () => {
      alert('Not Confirmed');
    });
  });

  // Modal Escape-Key event listener
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Hide Model on outside click
  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      hideModal();
    }
  });

  return {
    showModal: showModal,
    showDialog: showDialog,
  };
})();
