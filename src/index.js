const pokemon = require("./pokemon.json");
const express = require("express");

let ultimoID = 4;

const app = express();

app.use(express.json());

app.get("/", function (request, response) {
    response.end("API Pokemon");
});

/**
 * Reto: API de Pokemon
 *
 * Estructura de los datos de entrenadores
 *  {
 *    "id": 1,
 *    "nombre": "Ash Ketchup",
 *    "region": "Kanto",
 *    "pokemon": [
 *      "Pikachu",
 *      "Charmander",
 *      "Squirtle"
 *    ]
 * }
 *
 *
 * 1. Obtener la lista de los NOMBRES y ID de los entrenadores
 *
 * 2. Obtener la info de un entrenador por su ID
 * 
 * 3. Obtener el listado de POKEMON de un entrenador (por ID)
 * 
 * 4. Crear un nuevo entrenador (sin pokemon)
 * 
 * 5. Agregar un pokemon a un entrenador
 */


//---1.Obtener la lista de los NOMBRES y ID de los entrenadores---//
app.get("/obtenerEntrenadores", function (request, response) {
    const result = pokemon.map((entrenador) => ({ id: entrenador.id, nombre: entrenador.nombre, pokemons: entrenador.pokemon }));
    response.json(result);
});

//---2.Obtener la info de un entrenador por su ID---//
app.get("/obtenerEntrenador/:entrenadorID", function (request, response) {
    let { params: { entrenadorID } } = request;

    entrenadorID = Number(entrenadorID);
    const result = pokemon.filter((entrenador) => entrenador.id === entrenadorID);

    response.json(result);
});

//---3.Obtener el listado de POKEMON de un entrenador (por ID)---//
app.get("/entrenadorPokemones/:entrenadorID", function (request, response) {
    let { params: { entrenadorID } } = request;
    
    entrenadorID = Number(entrenadorID);

    const entrenador = pokemon.filter((entrenador) => entrenador.id === entrenadorID);

    response.json(entrenador[0].pokemon);
});

//--4.Crear un nuevo entrenador (sin pokemon)---//
app.get('/agregarEntrenador', function (request, response) {
    const { body: { entrenador } } = request;

    if (!entrenador) {
        return response.end('Error, agrega un entrenador');
    }

    pokemon.push({ ...entrenador, id: ++ultimoID });

    response.end("Entrenador agregado");
});

//---5.Agregar un pokemon a un entrenador---//
app.get("/agregarPokemon/:entrenadorID", function (request, response) {
    let { params: { entrenadorID } } = request;
    let { body: { pokemonName } } = request;

    entrenadorID = Number(entrenadorID);

    if (!pokemonName) {
        return response.end('Ingresa un pokemon');
    }

    if (!entrenadorID) {
        return response.end('Ingresa el ID de un entrenador pokemon');
    }

    pokemon.map((entrenador) => {
        if (entrenador.id === entrenadorID) {
            entrenador.pokemon.push(pokemonName);
        }
    })

    response.json(`Se agrego el pokemon ${pokemonName} al entrenador con ID ${entrenadorID}`);
});

app.listen(8080, function () {
    console.log("> Escuchando puerto 8080");
});