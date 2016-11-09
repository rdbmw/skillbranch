import express from 'express';
import Promise from 'bluebird';
import _ from 'lodash';

import canonize from './lesson1/canonize';
import { getPokemons, getPokemon } from './lesson1/pokeapi';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ---------------------------------------------------------------------------//
// Lesson 2. Hello JS World. Task 2B: Surname Name Patronym -> Surname N. P.
app.get('/task2B', (req, res) => {
  const fullName = String.trim(req.query.fullname || '').replace(/\s+/g, ' ');
  let editName;
  if (fullName.search(/[0-9_/]/) === -1) {
    const strArr = fullName.split(' ');
    switch (strArr.length) {
      case 3:
        editName = `${strArr[2].charAt(0).toUpperCase()}${strArr[2].slice(1).toLowerCase()} ${strArr[0].charAt(0).toUpperCase()}. ${strArr[1].charAt(0).toUpperCase()}.`;
        break;
      case 2:
        editName = `${strArr[1].charAt(0).toUpperCase()}${strArr[1].slice(1).toLowerCase()} ${strArr[0].charAt(0).toUpperCase()}.`;
        break;
      case 1:
        editName = strArr[0] === '' ? 'Invalid fullname' : `${strArr[0].charAt(0).toUpperCase()}${strArr[0].slice(1).toLowerCase()}`;
        break;
      default:
        editName = 'Invalid fullname';
    }
  } else {
    editName = 'Invalid fullname';
  }
  res.send(editName);
});

// ---------------------------------------------------------------------------//
// Lesson 2. Hello JS World. Task 2A: A+B
app.get('/task2A', (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  if (isNaN(a)) {
    a = 0;
  }
  if (isNaN(b)) {
    b = 0;
  }
  // console.log('a=', a);
  // console.log('b=', b);
  // console.log('a+b=', a + b);
  res.json(a + b);
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
