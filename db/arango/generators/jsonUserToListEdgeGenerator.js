const fs = require('fs');
const faker = require('faker');
const {argv} = require('yargs');

const numLines = 2000000
const numStartUserList = 19;
const numEndUserList = 10;
const numStartListListing = 9;
const numEndListListing = 0;
const fileName = '../json/edgeUserToListData.json';
const stream = fs.createWriteStream(fileName);



randInt = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

createUserListEdge = (i, from, to) => {
  let document = {
    _key : `${i}`,
    _from : `users/${from}`,
    _to: `favorite_lists/${to}`
  }
  return document;
}

const userListDataGen = (i, j, stream, encoding, cb) => {
  function writing() {
    let ok = true;
    do {
      i--;
      const edge = JSON.stringify(createUserListEdge(i + 1, randInt(j), randInt(j)));

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

userListDataGen(numLines, numLines, stream, 'utf8', () => {
  stream.end();
  console.log('User to List Edges generated')
});
