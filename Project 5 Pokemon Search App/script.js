const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const nameSpan = document.getElementById("pokemon-name");
const idSpan = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const typesDiv = document.getElementById("types");
const hpCell = document.getElementById("hp");
const attackCell = document.getElementById("attack");
const defenseCell = document.getElementById("defense");
const spAttackCell = document.getElementById("special-attack");
const spDefenseCell = document.getElementById("special-defense");
const speedCell = document.getElementById("speed");

const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData = async () => {
  try {
    const res = await fetch(pokeAPI);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    console.log(err);
  }
};

const getStats = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const {
      sprites,
      name,
      id,
      weight,
      height,
      types,
      stats,
    } = data;
    
    typesDiv.innerHTML = "";
    nameSpan.innerText = name.toUpperCase();
    idSpan.innerText = "#" + id;
    weightSpan.innerText = "Weight: " + weight;
    heightSpan.innerText = "Height: " + height;
    
    spriteContainer.innerHTML = `<img id="sprite" src="${sprites["front_default"]}" alt="Image of ${name}">`;

    types.forEach(({ type }) => {
      let color = getTypeColor(type.name);
      typesDiv.innerHTML += `<div style="background-color:${color};">${type.name.toUpperCase()}</div>`
    });

    hpCell.innerText = stats[0].base_stat;
    attackCell.innerText = stats[1].base_stat;
    defenseCell.innerText = stats[2].base_stat;
    spAttackCell.innerText = stats[3].base_stat;
    spDefenseCell.innerText = stats[4].base_stat;
    speedCell.innerText = stats[5].base_stat;
    
  } catch (err) {
    console.log(err);
  }
};

const getTypeColor = (type) => {
  const typeList = {
    normal: "lightgrey",
    fire: "red",
    fighting: "maroon",
    water: "aqua",
    flying: "blue",
    grass: "green",
    poison: "purple",
    electric: "yellow",
    ground: "brown",
    psychic: "indigo",
    rock: "grey",
    ice: "royalblue",
    bug: "forestgreen",
    dragon: "teal",
    ghost: "rebeccapurple",
    dark: "black",
    steel: "slategrey",
    fairy: "pink",
    "???": "lightgreen",
  };

  return typeList[type];
}

const displayPokemon = (data) => {
  const pokemonList = data["results"];
  let pokemonFound = false;
  let pokemonUrl;
  pokemonList.forEach(({ name, id, url }) => {
    if (searchInput.value.toLowerCase() === name
    || parseInt(searchInput.value) === id) {
      pokemonFound = true;
      pokemonUrl = url;
    }
  });

  if (pokemonFound) {
    getStats(pokemonUrl);
  } else {
    alert("Pokémon not found");
  }
}

searchButton.addEventListener("click", fetchData);
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});
