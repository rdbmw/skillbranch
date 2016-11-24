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
const HEX_REGEX = /^#(?:[a-fA-F\d]{3}){1,2}\b/;
const RGB_REGEX = /^rgba?\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*(?:,\s*(0(\.\d+)?|1(\.0+)?)\s*)?\)/;
const HSL_REGEX = /^hsla?\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}(?:,\s*(0(\.\d+)?|1(\.0+)?)\s*)?\)/;

const rgbToHex = (rgb) => {
  const elArr = rgb.match(/rgba?\((.+?)\)/)[1].split(',').map((value) => {
    value.trim();
    return parseInt(value, 10);
  });
  const vals = elArr.map((value) => {
    return `0${value.toString(16)}`.slice(-2);
  });
  return `#${vals[0]}${vals[1]}${vals[2]}`;
};

const hueToRgb = function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + ((q - p) * 6 * t);
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + ((q - p) * ((2 / 3) - t) * 6);
  return p;
};

const hslToHex = (hsl) => {
  const elArr = hsl.match(/hsla?\((.+?)\)/)[1].split(',').map((value) => {
    value.trim();
    return parseFloat(value);
  });
  const h = elArr[0] / 360;
  const s = elArr[1] / 100;
  const l = elArr[2] / 100;
  let r;
  let g;
  let b;
  let q;
  let p;
  if (s === 0) {
    r = g = b = l;
  } else {
    q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
    p = (2 * l) - q;
    r = hueToRgb(p, q, h + (1 / 3));
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - (1 / 3));
  }
  return rgbToHex(`rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`);
};

app.get('/task2D', (req, res) => {
  const urlColor = String.trim(req.query.color || '').replace(/%20/g, '').replace(/(%23|#)([a-fA-F\d])/, '$2').replace(/%25/g, '%');

  if (HEX_REGEX.test(`#${urlColor}`)) {
    // console.log('hex', urlColor);
    if (urlColor.length === 3) {
      return res.send(`#${[].map.call(urlColor, value => (value + value)).join('')}`);
    }
    if (urlColor.length === 6) {
      return res.send(`#${urlColor.toLowerCase()}`);
    }
  }
  if (RGB_REGEX.test(urlColor)) {
    // console.log('rgb', urlColor);
    return res.send(rgbToHex(urlColor));
  }
  if (HSL_REGEX.test(urlColor)) {
    return res.send(hslToHex(urlColor));
  }
  return res.send('Invalid color');
});

// ---------------------------------------------------------------------------//
// Lesson 2. Hello JS World. Task 2D: ?color -> HEX
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
