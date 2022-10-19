let pokemonRepository = function() {let t = [];function e(e) {t.push(e);}function n() {return t;}function o(t) {i(t).then(function() {var e;let n,o,i,a,r,l;e = t,n = $('.modal-title'),o = $('.modal-body'),console.log(e.name),n.empty(),o.empty(),i = $('<h2>' + makeProper(e.name, !0) + '</h2>'),a = $('<p>Height: ' + e.height + '</p>'),r = $('<p>Weight: ' + e.weight + '</p>'),l = $('<img class=\'pokemon-modal-image\'>'),l.attr('src', e.imageUrl),l.attr('height', 200),n.append(i),o.append(l),o.append(a),o.append(r);});}function i(t) {return fetch(t.detailsUrl).then(function(t) {return t.json();}).then(function(e) {t.imageUrl = e.sprites.front_default,t.height = e.height,t.weight = e.weight,t.types = e.types;}).catch(function(t) {console.error(t);});}return {add: e,getAll: n,addListItem: function t(e) {let n = $('.main-list'),i = $('<button></button>').addClass('list-group-item text-center').addClass('btn btn-outline-dark mb-3 pokemon-list-item').attr('data-toggle','modal').attr('role','listItem').attr("type","button").attr("data-target","#pokemonModal").text(makeProper(e.name,!0)).on({click(){o(e)}});n.append(i)},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i,showDetails:o}}();function makeProper(t,e){let n=t.split(" ");function o(t){let e=t.slice(1);return t.charAt(0).toUpperCase()+e}return e?n.forEach((t,e)=>n[e]=o(t)):n[0]=o(n[0]),n.join(" ")}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
