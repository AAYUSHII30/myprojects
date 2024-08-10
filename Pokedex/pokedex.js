async function homepage(){
    try{
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500');
        let data = await response.json();
        displayPosts(data.results);
    } catch (error){
        console.error('Error fetching posts:', error);
    }
}
homepage();

let users = [];

function displayPosts(posts){
    const pokemon = document.querySelector('.box');
    users = posts.map(post => {
        const display = document.createElement('div');
        const pokemonId = getPokemonId(post.url);
        display.classList.add('card');
        display.innerHTML = `
        <span>${post.name}</span>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png">
        `;
        display.addEventListener('click', () => popup(post.url));
        pokemon.appendChild(display);
        return{ name: post.name.toLowerCase(), element: display};
    });
}
function getPokemonId(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}

async function popup(url){
    try{
        let response = await fetch(url);
        let pokemonData = await response.json();
        document.getElementById('content').innerHTML = `
        <div class="circles">
        <span class="circle"></span>
        <span class="dot" style="background-color: red;"></span>
        <span class="dot" style="background-color: yellow;"></span>
        <span class="dot" style="background-color: green;"></span>
        </div>
        <hr>
        <div class="main">
        <div class="photo">
        <h2>${pokemonData.name}</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png">
        </div>
        <div class="details">
        <p style="font-weight: 900; margin:10px">Type: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p style="font-weight: 900; margin:10px">Height: ${pokemonData.height}</p>
        <p style="font-weight: 900; margin:10px">Weight: ${pokemonData.weight}</p>
        <p style="font-weight: 900; margin:10px">Abilities: ${pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
        </div>     
        </div>
        `;
        const popupbox = document.querySelector('.box2');
        popupbox.style.display = 'block';

        window.onclick = event =>{
            if (event.target == popupbox) {
                popupbox.style.display = 'none';
            }
        }
    } catch (error){
        console.error('Error fetching Pokémon details:', error);
    }
}
const searchInput = document.querySelector('[data-search]');
searchInput.addEventListener("input", (e)=> {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible = user.name.includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})
