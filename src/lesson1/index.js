import express from 'express';
import Promise from 'bluebird';
import forEachTimeout from 'foreach-timeout';
import _ from 'lodash';
import fs from 'fs';


import canonize from './canonize';
import { getPokemons, getPokemon } from './pokeapi';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// ---------------------------------------------------------------------------//
// Lesson 1. Hello JS World. PokeApi
const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight'];

// const pokemonsUrl = `${baseUrl}/pokemon`;
// getPokemons(pokemonsUrl).then((pokemons) => {
//   console.log(pokemons.length);
// });

 async function loadPokemons() {
   const pokemonsUrl = `${baseUrl}/pokemon`;
   const pokemonsInfo = await getPokemons(pokemonsUrl);
   //  const pokemonsPromises = pokemonsInfo.map(info => getPokemon(info.url));
  //  let pokemonsFull;
   return forEachTimeout(pokemonsInfo, info => getPokemon(info.url), 1000)
   .then(async (results) => {
     const pokemonsFull = await Promise.all(results);
     return pokemonsFull;
   }
  )
  .then((pokeFull) => {
    const pokemons = pokeFull.map(pokemon => _.pick(pokemon, pokemonFields));
    return pokemons;
  }).catch(err => console.log(err));
 }

let pokemons = {};
if (fs.existsSync('../pokejson.json')) {
  const contents = fs.readFileSync('../pokejson.json', 'utf8');
  pokemons = JSON.parse(contents);
  console.log('покемоны загружены из файла', pokemons.length);
} else {
  loadPokemons().then((result) => {
    pokemons = result;
    const str = JSON.stringify(pokemons);
    fs.writeFileSync('../pokejson.json', str);
    console.log('покемоны загружены из сети', pokemons.length);
  }).catch(err => console.log(err));
}

app.get('/pokeapi', async (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  const pokeRange = _.sortBy(pokemons, pokemon => pokemon.name).slice(offset,offset+limit);
  return res.json(pokeRange.map(el => el.name));
});

 app.get('/pokeapi/all', async (req, res) => {
   return res.json(pokemons);
 });

app.get('/pokeapi/:param', async (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  const param = req.params.param || '';
  const sortPokemons = _.sortBy(pokemons, (pokemon) => {
    switch (param) {
      case 'fat':
        return -pokemon.weight / pokemon.height;
      case 'angular':
        return pokemon.weight / pokemon.height;
      case 'heavy':
        return -pokemon.weight;
      case 'light':
        return pokemon.weight;
      case 'huge':
        return -pokemon.height;
      case 'micro':
        return pokemon.height;
      default:
        return pokemon.name;
    }
  }, pokemon => pokemon.name);
  console.log(offset, offset + limit);
  return res.json(sortPokemons.slice(offset, offset + limit).map(el => el.name));
});


// ---------------------------------------------------------------------------//
// Lesson 1. Hello JS World. Function Canonize
app.get('/canonize', (req, res) => {
  const userName = canonize(req.query.url || '');
  res.json({
    url: req.query.url,
    userName });
});

// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
