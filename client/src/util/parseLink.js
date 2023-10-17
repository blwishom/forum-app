// react-app/src/util/parseLink.js

const parseLink = (link) => {
  const parsedLink = link.split('/')[2];
  if (parsedLink.startsWith('www.')) {
    return parsedLink.slice(4);
  }
  return parsedLink;
}

export default parseLink;


// test
// console.log(parseLink('https://www.youtube.com/watch?v=5i9A')); // youtube.com
// console.log(parseLink('https://tokyostarterkit.jp/')); // tokyostarterkit.jp
// console.log(parseLink('https://docs.google.com/spreadsheets/d')) // docs.google.com
