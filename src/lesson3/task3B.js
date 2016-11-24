import express from 'express';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ---------------------------------------------------------------------------//
// Lesson 3. Express.js & MongoDB. Task 3B
const modelUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

let model = {};
fetch(modelUrl).then(async (res) => {
  model = await res.json();
  console.log('Модель загружена');
}).catch((err) => {
  console.log('Чтото пошло не так:', err);
});


app.get('/task3B', (req, res) => res.json(model));

app.get('/task3B/users', (req, res) => {
  const havePet = req.query.havePet || '';
  let users = _.get(model, 'users');
  if (!(havePet === '')) {
    const catsType = _.get(model, 'pets').filter(item => item.type === havePet);
    // console.log('cats', cats);
    users = users.filter((item) => {
      const haveCatsDogs = catsType.filter(cat => cat.userId === item.id);
      // console.log(item.id, '', haveCats);
      if (haveCatsDogs.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
    // console.log(userWithCatsDogs);
    // if (userWithCatsDogs.length === 0) {
      // return res.status(404).send('Not Found');
    // } else {
  return res.json(users);
    // }

});

app.get('/task3B/users/:param', (req, res) => {
  const userParam = req.params.param || null;
  let user;
  if (isNaN(userParam)) {
    user = _.get(model, 'users').filter(item => item.username === userParam);
    console.log(user);
  } else {
    user = _.get(model, 'users').filter(item => item.id === +userParam);
  }
  if (user.length === 0) {
    return res.status(404).send('Not Found');
  } else {
    return res.json(user[0]);
  }
});

app.get('/task3B/users/:param/pets', (req, res) => {
  const param = req.params.param || null;
  let userId;
  if (isNaN(param)) {
    userId = _.get(model, 'users').filter(user => user.username === param)[0].id
 } else {
    userId = param;
  }
  const pet = _.get(model, 'pets').filter(item => item.userId === +userId);
  if (pet.length === 0) {
    return res.status(404).send('Not Found');
  } else {
    return res.json(...pet);
  }
});

//
app.get('/task3B/pets', (req, res) => {
  const type = req.query.type || '';
  const ageGt = req.query.age_gt || '';
  const ageLt = req.query.age_lt || '';
  let pets;
  pets = _.get(model, 'pets');
  if (!(type === '')) {
    console.log('type');
    pets = pets.filter(item => item.type === type);
  }
  if (!(ageGt === '')) {
    console.log('ageGt');
    pets = pets.filter(item => item.age > +ageGt);
  }
  if (!(ageLt === '')) {
    console.log('ageДt');
    pets = pets.filter(item => item.age < +ageLt);
  }
  return res.json(pets);
});

app.get('/task3B/pets/:param', (req, res) => {
  const param = req.params.param || null;
  let pet;
  if (isNaN(param)) {
    return res.json("err");
  } else {
    pet = _.get(model, 'pets').filter(item => item.id === +param);
  }
  if (pet.length === 0) {
    return res.status(404).send('Not Found');
  } else {
    return res.json(...pet);
  }
});

// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
