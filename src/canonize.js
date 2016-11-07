export default function canonize(url) {
  const reExp = new RegExp('(?:.*(?:\\/|@))?([0-9_\\-a-zA-Z\\.]+)');
  const userName = `@${url.match(reExp)[1]}`;
  return userName;
}
