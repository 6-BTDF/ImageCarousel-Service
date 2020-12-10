const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

// var numUsers = 1000000;
// var numListingDetails = 10000000;
// var numLists = 4000000;
// var numEdges = 20000000;

var numUsers = 10000000;
var numLists = 10000000;

const userWriter = csvWriter();
const listWriter = csvWriter();

randInt = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

createUser = (id) => {
  let document = {
    _key    : id,
    first_name  : faker.name.firstName(),
    last_name    : faker.name.lastName(),
    email  : faker.internet.email(),
  };
  return document;
};

createFavoriteList = (id) => {
  let document = {
    _key : id,
    list_name : faker.random.words(randomIntFromInterval(1,3))
  }
  return document;
}

const userDataGen = (i, cb) => {
  userWriter.pipe(fs.createWriteStream('../data/csv/userData.csv'));

  function write() {
    let ok = true;
    do {
      i--;
      let newUser = createUser(i+1);
      if (i === 0) {
        userWriter.write(newUser, cb);
      } else {
        ok = userWriter.write(newUser);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      userWriter.once('drain', write);
    }
  }
  write();
};

const listDataGen = (i, cb) => {
  listWriter.pipe(fs.createWriteStream('../data/csv/listData.csv'));

  function write() {
    let ok = true;
    do {
      i--;
      let newList = createFavoriteList(i+1);
      if (i === 0) {
        listWriter.write(newList, cb);
      } else {
        ok = listWriter.write(newList);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      listWriter.once('drain', write);
    }
  }
  write();
};

listDataGen(numLists, () => {
  listWriter.end();
});

userDataGen(numUsers, () => {
  userWriter.end();
});



