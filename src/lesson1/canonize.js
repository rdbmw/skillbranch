export default function canonize(url) {
  if (!url) {
    return '';
  }
  // const reExp = new RegExp('(?:.*(?:\\/|@))?([0-9_\\a-zA-Z\\.]+)');
  const reExp = new RegExp('(?:\\w*:?\\/\\/|@)?(?:(?:[A-Za-z0-9-]+[\\.:])+[A-Za-z0-9-:]+)?\\/?@?([0-9_\\-a-zA-Z\\.]+)?');
  if (url.match(reExp)) {
    return `@${url.match(reExp)[1]}`;
  }
  return '';
}
