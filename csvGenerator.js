const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

// var numUsers = 1000000;
// var numListingDetails = 10000000;
// var numLists = 4000000;
// var numEdges = 20000000;

var numUsers = 1000;
var numListingDetails = 1000;
var numLists = 1000;
var numEdges = 1000;

const listingDetailsWriter = csvWriter();
const userWriter = csvWriter();
const listWriter = csvWriter();
const userListEdgeWriter = csvWriter();
const listListingEdgeWriter = csvWriter();

randInt = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

photoGenerator = () => {
  return `https://sdcimages.s3-us-west-1.amazonaws.com/Images/${randomIntFromInterval(1, 999)}_.jpg`;
};

randArrayOfPhotos = () => {
  let arrayOfPhotos = [];
  for (var i = 0; i < randomIntFromInterval(10, 30); i++) {
    arrayOfPhotos.push(photoGenerator());
  }
  return arrayOfPhotos;
};

createUserListEdge = (from, to) => {
  let document = {
    _from : `users/${from}`,
    _to: `favorite_lists/${to}`
  }
  return document;
}

createListListingEdge = (from, to) => {
  let document = {
    _from : `favorite_lists/${from}`,
    _to   : `listings/${to}`
  }
  return document;
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
    list_name : faker.random.words(randInt(3))
  }
  return document;
}

createListing = (id) => {
  let weekday_rate = randomIntFromInterval(25, 1500);
  let weekend_rate = weekday_rate * 1.5;
  let bedrooms = randInt(10);
  let baths = randomIntFromInterval(1, bedrooms) * .5;
  let photos = randArrayOfPhotos();
  let document = {
    _key: id,
    listing_name: faker.lorem.words(3),
    listing_description: faker.lorem.sentence(),
    listing_location: faker.address.city() + ', ' + faker.address.stateAbbr(),
    listing_num_reviews: randInt(1000),
    listing_stars: randomIntFromInterval(10, 50) / 10,
    guests : bedrooms * 2,
    bedrooms: bedrooms,
    baths: baths,
    weekday_rate: weekday_rate,
    weekendrate: weekend_rate,
    photos: photos,
    favorite_photo : photos[randomIntFromInterval(0, photos.length)]

  };
  return document;
}

const listingDetailsDataGen = (i, cb) => {
  listingDetailsWriter.pipe(fs.createWriteStream('./db/data/listingDetailsData.csv'));

  function write() {
    let ok = true;
    do {
      i--;
      let newListing = createListing(i+1);
      if (i === 0) {
        listingDetailsWriter.write(newListing, cb);
      } else {
        ok = listingDetailsWriter.write(newListing);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      listingDetailsWriter.once('drain', write);
    }
  }
  write();
};

const userDataGen = (i, cb) => {
  userWriter.pipe(fs.createWriteStream('./db/data/userData.csv'));

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
  listWriter.pipe(fs.createWriteStream('./db/data/listData.csv'));

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

const userListDataGen = (i, j, cb) => {
  userListEdgeWriter.pipe(fs.createWriteStream('./db/data/userListEdgeData.csv'));

  function write() {
    let ok = true;
    do {
      i--;
      let userToList = createUserListEdge(randInt(j), randInt(j));
      if (i === 0) {
        userListEdgeWriter.write(userToList, cb);
      } else {
        ok = userListEdgeWriter.write(userToList);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      userListEdgeWriter.once('drain', write);
    }
  }
  write();
};

const listListingDataGen = (i, j, cb) => {
  listListingEdgeWriter.pipe(fs.createWriteStream('./db/data/listListingEdgeData.csv'));

  function write() {
    let ok = true;
    do {
      i--;
      let ListToList = createListListingEdge(randInt(j), randInt(j));
      if (i === 0) {
        listListingEdgeWriter.write(ListToList, cb);
      } else {
        ok = listListingEdgeWriter.write(ListToList);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      listListingEdgeWriter.once('drain', write);
    }
  }
  write();
};

listListingDataGen(numEdges, numEdges, () => {
  listListingEdgeWriter.end();
})

userListDataGen(numEdges, numEdges, () => {
  userListEdgeWriter.end();
});

listDataGen(numLists, () => {
  listWriter.end();
});

userDataGen(numUsers, () => {
  userWriter.end();
});

listingDetailsDataGen(numListingDetails, () => {
  listingDetailsWriter.end();
});

