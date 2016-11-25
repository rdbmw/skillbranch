import express from 'express';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const arr = [1, 18, 243, 3240, 43254, 577368, 7706988, 102876480, 1373243544, 18330699168, 244686773808, 3266193870720, 43598688377184, 581975750199168, 7768485393179328, 103697388221736960, 1384201395738071424, 18476969736848122368, 246639261965462754048];

// ---------------------------------------------------------------------------//
// Lesson 2. Hello JS World. Task 2D: ?color -> HEX

app.get('/task2X', (req, res) => {
  const param = +req.query.i;
  res.send(`${arr[param]}`);
});

// ---
// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
