const fs = require('fs');
const faker = require('faker');
const {argv} = require('yargs');

const numLines = 10000000;
const numStartUserList = 19;
const numEndUserList = 10;
const numStartListListing = 9;
const numEndListListing = 0;
const fileName = '../json/edgeListToListingData.json';
const stream = fs.createWriteStream(fileName);



randInt = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

createListListingEdge = (i, from, to) => {
  let document = {
    _key : `${i}`,
    _from : `favorite_lists/${from}`,
    _to   : `listings/${to}`
  }
  return document;
}


const listListingDataGen = (i, j, stream, encoding, cb) => {
  function writing() {
    let ok = true;
    do {
      i--;
      const edge = JSON.stringify(createListListingEdge(i + 1, randInt(j), randInt(j)));

      if (i === 0) {
        stream.write(edge, encoding, cb);
      } else {
        ok = stream.write(edge, encoding);
      }
      stream.write('\n');
    } while (i > 0 && ok);
    if (i > 0 && !ok) {
      stream.once('drain', writing);
    }
  }
  writing();
}

listListingDataGen(numLines, numLines, stream, 'utf8', () => {
  stream.end();
  console.log('List to Listing Edges generated')
});