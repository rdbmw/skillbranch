import express from 'express';
import cors from 'cors';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';


const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    h: 'H',
  });
});

const secret = 'rdbmmdsldlsldl';

app.get('/token', (req, res) => {
  const data = {
    user: 'rdbmw',
    name: 'Mikhail',
  };
  res.json(jwt.sign(data, secret));
});

app.get('/protected', expressJWT({ secret }), (req, res) => {
  res.json(req.user);
});

// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
