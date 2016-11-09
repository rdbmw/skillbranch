import canonize from './canonize';

const urls = [
  'https://vk.com/igor.suvorov',
  'https://twitter.com/suvorovigor',
  'HTTPS://twitter.com/SuvorovIgor123',
  'https://telegram.me/skillbranch',
  'https://www.telegram.me/skillbranch',
  '//telegram.me/skillbranch',
  'http://telegram.me/skillbranch',
  '@skillbranch',
  'skillbranch',
  'https://vk.com/skillbranch?w=wall-117903599_1076'];

urls.forEach((url) => {
  const userName = canonize(url);
  console.log(userName);
});
