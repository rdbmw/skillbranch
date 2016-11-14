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
// Lesson 3. Express.js & MongoDB.
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl).then(async (res) => {
  pc = await res.json();
  console.log('Модель загружена');
}).catch((err) => {
  console.log('Чтото пошло не так:', err);
});

app.get('/task3A/*', async (req, res) => {
  const url = req.originalUrl.charAt(req.originalUrl.length - 1) === '/' ? req.originalUrl.slice(8, req.originalUrl.length - 1) : req.originalUrl.slice(8);

  if (url === '') {
    return res.json(pc);
  }

  if (url === 'volumes') {
    const volumes = {};
    const hdds = _.get(pc, 'hdd');
    for (let i = 0; i < hdds.length; i += 1) {
      if (!volumes[hdds[i].volume]) {
        volumes[hdds[i].volume] = hdds[i].size;
      } else {
        volumes[hdds[i].volume] += hdds[i].size;
      }
    }
    return res.json(_.mapValues(volumes, i => `${i}B`));
  }

  const urlParts = url.split('/');
  let result = _.get(pc, urlParts, 'Not Found');
  if (result === 'Not Found') {
    return res.status(404).send(result);
  }

  if (urlParts.length > 1) {
    const checkObj = _.get(pc, urlParts.slice(0, urlParts.length - 1));
    if (!(typeof checkObj === 'object')) {
      result = 'Not Found';
    }
    if (Array.isArray(checkObj)) {
      if (isNaN(urlParts[urlParts.length - 1])) {
        result = 'Not Found';
      }
    }
  }

  if (result === 'Not Found') {
    return res.status(404).send(result);
  }
  return res.json(result);
});


// ---------------------------------------------------------------------------//
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
