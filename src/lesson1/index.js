import express from 'express';
import Promise from 'bluebird';
import _ from 'lodash';


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

app.get('/pokeapi', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map(info => getPokemon(info.url));
    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map(pokemon => _.pick(pokemon, pokemonFields));
    const sortPokemons = _.sortBy(pokemons, pokemon => -pokemon.weight);
    return res.json(sortPokemons);
  } catch (err) {
    // console.log(err);
    return res.json(err);
  }
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
