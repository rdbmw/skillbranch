import express from 'express';

import canonize from '../lesson1/canonize';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ---------------------------------------------------------------------------//
// Lesson 2. Hello JS World. Task 2C: `telegram.me/skillbranch` -> username `skillbranch`
app.get('/task2C', (req, res) => {
  const userName = canonize(req.query.username);
  res.send(userName);
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
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
