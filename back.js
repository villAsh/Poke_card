var poke_name = document.getElementById('poke_name');
var search_btn = document.getElementById('search_btn');
let poke_list = document.getElementById('poke_list');


//Lowers the string which is entered by the user
function lower(string){
    return string.toLowerCase();
}
search_btn.addEventListener('click', get_pokemon);
//Main function which returns a pokemon card
function get_pokemon(e) {
    let poke_card = document.getElementById('poke_card');
    let pokename = lower(poke_name.value)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}?limit="151"`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const pokemon = {
                name: data.name,
                weight: data.weight,
                img_src: data.sprites.other["official-artwork"].front_default,
                alt_text: data.name,
                id: data.id,
                baseHp: data.stats['0'].base_stat,
                baseAttack: data.stats['1'].base_stat,
                baseDefence: data.stats['2'].base_stat,
                baseSpeed: data.stats['5'].base_stat
            };
            console.log(pokemon);
            //CREATING POKEMON CARD
            poke_card.innerHTML = `
               <div class="col-12 col-sm-6 poke_img">
                <div class="card rounded rounded-2 shadow-lg">
                    <div class="text-end d-inline-block p-4 text-info">
                        <h6 class="bg-light d-inline p-3 rounded rounded-3">HP : <span>${pokemon.baseHp}</span></h6>
                    </div>
                    <div class="card-body">
                        <figure class="text-center">
                            <img src="${pokemon.img_src}" alt="${pokemon.alt_text}" class="poke_img img-fluid"
                                loading="lazy">
                        </figure>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-center p-3 text-warning">
                        <h4>${pokemon.name}</h4>
                        <h4>${pokemon.weight}<span> kg</span></h4>
                    </div>
                    <div class="d-flex justify-content-around p-3" id="types">
                        
                    </div>
                    <div class="d-flex flex-row justify-content-around p-3">
                        <div class="d-inline-flex flex-column text-center">
                            <h5 class="text-danger">Attack</h5>
                            <h5>${pokemon.baseAttack}</h5>
                        </div>
                        <div class="d-inline-flex flex-column text-center">
                            <h5 class="text-success">Defence</h5>
                            <h5>${pokemon.baseDefence}</h5>
                        </div>    
                        <div class="d-inline-flex flex-column text-center">
                            <h5 class="text-info">Speed</h5>
                            <h5>${pokemon.baseSpeed}</h5>
                        </div>
                    </div>
                </div>
            </div>
               `;
            Poke_types(data.types);
            e.preventDefault();
            poke_name.value = "";
        });  
       
        
}

// TO CREATE POKEMON TYPES
let Poke_types = (types) =>{
    console.log(types);
    types.forEach((item) => {
        let span = document.createElement("span");
        span.classList.add('bg-danger', 'px-4' ,'py-2' , 'rounded-pill');
        span.innerHTML = `<span class="bg-danger px-4 py-2 rounded-pill fw-bolder text-white">${item.type.name}</span>`
        document.getElementById('types').appendChild(span);
});
}
//TO CREATE OPTION LIST OF ALL POKEMON
function Fetch_Pokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
    .then(res => res.json())
    .then(kanto_pokemon =>{
            //console.log(pokemon_list)
        const pokemon_list = kanto_pokemon.results.map((kanto_pokemon,index) => (
            {
                name: kanto_pokemon.name,
                id: kanto_pokemon.id+1
            }
        ));
        console.log(pokemon_list)
        add_pokemon(pokemon_list);
    })
};
const add_pokemon = (pokemon) => {
    for(let i = 0;i < pokemon.length;i++){
        const opt = document.createElement('option');
        opt.value = `${pokemon[i].name}`;
        opt.textContent = `${pokemon[i].name}`;
        poke_list.appendChild(opt);
    }
    // const opt = document.createElement('option');
    //const option_list = pokemon.forEach(pokemon => poke_list.innerHTML = `<option>${pokemon.name}</option>`)
};
Fetch_Pokemon()
