let modals=(document.querySelector("#modal-container"),{showModal:function e(t,n){let i=$("#demoModal");i.find(".modal-title").text(t),i.find(".modal-body").html(n),$("#demoModal").modal("show")}}),pokemonRepository=function(){let e=[];function t(t){e.push(t)}function n(){return e}function i(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})}return{add:t,getAll:n,addListItem:function e(t){let n=t.name,o=document.querySelector(".main-list"),l=document.createElement("li"),r=document.createElement("button");l.classList.add("list-group-item","text-center"),r.classList.add("btn","btn-dark"),r.innerText=makeProper(n),r.classList.add("main-list__button"),r.addEventListener("click",function(e){(function e(t){i(t).then(function(){properName=makeProper(t.name,!0);let e=document.createElement("div");e.classList.add("modal-grid");let n=document.createElement("div");n.id="modal-text-container";let i=document.createElement("div");i.id="modal-image-container";let o=document.createElement("p");o.innerText=`Pokemon Name - ${properName}`;let l=document.createElement("p");l.innerText=`Pokemon Height - ${t.height}`;let r=document.createElement("img");r.classList.add("modal-img"),r.src=t.imageUrl,r.alt="Default front image of Pokemon",n.appendChild(o),n.appendChild(l),i.appendChild(r),e.appendChild(n),e.appendChild(i),modals.showModal(properName,e)})})(t)}),l.appendChild(r),o.appendChild(l)},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i}}();function getCuteMessage(e){return e<=.5?"<i> - So small and cute!</i>":""}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});let formValidation=function(){let e=document.querySelector("#register-form"),t=document.querySelector("#email"),n=document.querySelector("#password");function i(e,t){let n=e.parentElement,i=n.querySelector(".error-message");if(i&&n.removeChild(i),t){let o=document.createElement("div");o.classList.add("error-message"),o.innerText=t,n.appendChild(o)}}function o(){let e=t.value;return e?-1===e.indexOf("@")?(i(t,"Invalid email address."),!1):void i(t,null):(i(t,"Email is a required field."),!1)}function l(){let e=n.value;return e?e.length<8?(i(n,"Password must be at least 8 characters long."),!1):(i(n,null),!0):(i(n,"Password is a required field."),!1)}e.addEventListener("submit",e=>{e.preventDefault();let t,n;t=o(),n=l(),t&&n&&alert("Success!")}),t.addEventListener("input",o),n.addEventListener("input",l)}();function makeProper(e,t){let n=e.split(" ");function i(e){let t=e.slice(1);return e.charAt(0).toUpperCase()+t}return t?n.forEach((e,t)=>n[t]=i(e)):n[0]=i(n[0]),n.join(" ")}