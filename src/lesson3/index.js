import express from 'express';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import _ from 'lodash';
import mongoose from 'mongoose';

import saveDataInDb from './saveDataInDb';
import Pet from './models/Pet';
import User from './models/User';
import isAdmin from './middlewares/isAdmin';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());

// ---------------------------------------------------------------------------//
// Lesson 3. Express.js & MongoDB.
mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/rdbmw_skb3');

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});

app.post('/data', async (req, res) => {
  const data = req.body;
  if (!data.user) return res.status(400).send('user required');
  if (!data.pets) data.pets = [];
  const user = await User.findOne({
    name: data.user.name,
  });
  if (user) return res.status(400).send('user.name is exists');
  try {
    const result = await saveDataInDb(data);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});
  return res.send('ok');
});

// {
//  "user": {
//    "name": "rdbmw"
//  },
//  "pets": [
//    {
//      "name": "Pet1",
//      "type": "cat"
//    },
//    {
//      "name": "Pet2",
//      "type": "dog"
//    }
//  ]
// }

// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
