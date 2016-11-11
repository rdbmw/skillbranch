export default function canonize(url) {
  if (url === '') {
    return '';
  }
  // const reExp = new RegExp('(?:.*(?:\\/|@))?([0-9_\\a-zA-Z\\.]+)');
  const reExp = new RegExp('(?:\\w*:?\\/\\/|@)?(?:(?:[a-z0-9-]+\\.)+[a-z0-9-]+)?\\/?@?([0-9_\\-a-zA-Z\\.]+)');
  const userName = `@${url.match(reExp)[1]}`;
  return userName;
}
