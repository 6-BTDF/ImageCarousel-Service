const fs = require('fs');
const faker = require('faker');
const path = require('path');

const userStream = fs.createWriteStream(path.join(__dirname, '/psqlUsersData.csv'));
userStream.write('user_id, first_name, last_name, email\n');
let num_users = 10000000;

const generateUsers = () => {
  if (num_users === 0) return userStream.end();
  const user_id = num_users;
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const email = faker.internet.email();
  const userEntry = `${user_id}, ${first_name}, ${last_name}, ${email}\n`;
  const streamOkay = userStream.write(userEntry);
  num_users -= 1;
  if (!streamOkay) userStream.once('drain', generateUsers);
  else generateUsers();
}

generateUsers();