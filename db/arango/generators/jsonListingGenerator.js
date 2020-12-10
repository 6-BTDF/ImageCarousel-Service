const fs = require('fs');
const faker = require('faker');
const {argv} = require('yargs');

const numLines = 10000000;
const fileName = '../data/json/listingDetailsData.json';
const stream = fs.createWriteStream(fileName);

var numListingDetails = 1000;

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
  for (var i = 0; i < randomIntFromInterval(5, 10); i++) {
    arrayOfPhotos.push(photoGenerator());
  }
  return arrayOfPhotos;
};

createListing = (id) => {
  let weekday_rate = randomIntFromInterval(25, 1000);
  let weekend_rate = weekday_rate * 1.5;
  let bedrooms = randomIntFromInterval(1, 8);
  let baths = randomIntFromInterval(2, bedrooms) * .5;
  let photos = randArrayOfPhotos();
  let document = {
    _key: `${id}`,
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

const listingDetailsDataGen = (i, stream, encoding, cb) => {
  function writing() {
    let ok = true;
    do {
      i--;
      const listing = JSON.stringify(createListing(i+1));

      if (i === 0) {
        stream.write(listing, encoding, cb);
      } else {
        ok = stream.write(listing, encoding);
      }
      stream.write('\n');
    } while (i > 0 && ok);
    if (i > 0 && !ok) {
      stream.once('drain', writing);
    }
  }
  writing();
}

listingDetailsDataGen(numLines, stream, 'utf8', () => {
  stream.end();
  console.log('Listings generated')
});