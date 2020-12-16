const fs = require('fs');
const faker = require('faker');
const path = require('path');
const debug = require('debug')('app:gen:psql');

const listingsStream = fs.createWriteStream(path.join(__dirname, '/psqlListingsData.csv'));
listingsStream.write('listing_details_id, user_id, listing_name, listing_description, listing_location, listing_num_reviews, listing_stars, guests, bedrooms, baths, weekday_rate, weekend_event_rate, photos, fav_pic\n');
let listing_count = 10000000;
let total_users = 3;

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

const generate_listings = () => {
  if (listing_count === 0) return listingsStream.end();
  let listing_details_id = listing_count;
  let user_id = randomIntFromInterval(1, 10000000);
  let listing_name = faker.lorem.words(3);
  let listing_description = faker.lorem.sentence();
  let listing_location = `"${faker.address.city()}, ${faker.address.stateAbbr()}"`;
  let listing_num_reviews = randInt(1000);
  let listing_stars = randomIntFromInterval(10, 50) / 10;
  let weekday_rate = randomIntFromInterval(25, 1000);
  let weekend_event_rate = Math.floor(weekday_rate * 1.5);
  let bedrooms = randomIntFromInterval(1, 8);
  let baths = randomIntFromInterval(2, bedrooms) * .5;
  let guests = bedrooms * 2;
  let photoArray = randArrayOfPhotos();
  let photos = `"{${photoArray}}"`;
  let fav_pic = photoArray[randomIntFromInterval(0, photoArray.length)];
  let listing_entry = `${listing_details_id}, ${user_id}, ${listing_name}, ${listing_description}, ${listing_location}, ${listing_num_reviews}, ${listing_stars}, ${guests}, ${bedrooms}, ${baths}, ${weekday_rate}, ${weekend_event_rate}, ${photos}, ${fav_pic}\n`;
  let streamOkay = listingsStream.write(listing_entry);
  listing_count -= 1;
  if (!streamOkay) listingsStream.once('drain', generate_listings);
  else generate_listings();
}

generate_listings();