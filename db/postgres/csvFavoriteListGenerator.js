const fs = require('fs');
const faker = require('faker');
const path = require('path');

const userStream = fs.createWriteStream(path.join(__dirname, '/psqlFavoriteListData.csv'));
userStream.write('favorite_list_id, list_name, listing_details_id, user_id\n');
let num_lists = 10000000;
let total_users = 10000000;
let total_listings_id = 10000000;

randInt = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateUsers = () => {
  if (num_lists === 0) return userStream.end();
  const favorite_list_id = num_lists;
  const list_name = `"${faker.random.words(randomIntFromInterval(1,3))}"`;
  const listing_details_id = randomIntFromInterval(1, total_listings_id);
  const user_id = randomIntFromInterval(1, total_users);
  const userEntry = `${favorite_list_id}, ${list_name}, ${listing_details_id}, ${user_id}\n`;
  const streamOkay = userStream.write(userEntry);
  num_lists -= 1;
  if (!streamOkay) userStream.once('drain', generateUsers);
  else generateUsers();
}

generateUsers();