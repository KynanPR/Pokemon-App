# Welcome to Pokemon App!

This is an app I made as the main part of Acheivment 2 of my Full-Stack Immersion Career Foundry course.
It's a simple app that uses the PokeAPI to show information about Pokemon.

## Purpose

The purpose of this app was mostly in the learning it took to build it and as a demonstrative for my portfolio.

## Getting it Running

Getting this app running should be as simple as cloning the repo and running the `index.html`

## Dependancies

This app uses Javacript, Boostrapper (and therefore JQuery & Popper.js). It also includes a couple of pollyfills to enable newer JS fuctionality on older browser versions.

- Javascript
	- ES2021
 - Boostrapper
	 - Core - 4.3.1
	 - JQuery - 3.3.1
	 - Popper.js - 1.14.7
- Pollyfills
	- Fetch
	- Promise
 
### Linting

This project uses ESLint as it's JS linter.
It extends the Recommended preset with the following additional rules:

    "rules": {
       "quotes": ["error", "single"],
       "comma-dangle": ["error", "always-multiline"],
       "semi": ["error", "always"]
    }

## PokeAPI

The main content of the website is drawn from [PokeAPI](https://pokeapi.co/) a free RESTful API that contains a multitude of data about pokemon.