var Database = require('arangojs').Database;
var db = new Database();
const username = 'root';
const password = '';
db.useBasicAuth(username, password);
db.dropDatabase('airbnb');

function cb() {
  db.useDatabase('airbnb');
  var listingSchema = {
    rule : {
      type : 'object',
      properties : {
        listingName : {
          type : 'string',
        },
        listingDescription : {
          type : 'string',
        },
        listingLocation : {
          type : 'string',
        },
        listingStars : {
          type : 'number',
        },
        listingNumReviews : {
          type : 'number',
        },
        photos : {
          type : 'array',
        },
      },
    },
  }
  var userSchema = {
    rule :
      type        : 'object'
      properties  : {
        userName    : {
          type    : 'string'
        },
        listings  : {
          type    : 'array'
        },
        favorites : {
          type    : 'array',
        },ls
        }
  }

  var userCollection = db.collection('users');
  var listingCollection = db.collection('listings');
  listingCollection.create({ 'listingSchema': listingSchema})
  .then(
    () => console.log('listings created'),
    err => console.error('Failed to create listings:', err)
  )
  .then(() => {
    userCollection.create({ 'userSchema': userSchema})
    .then(
      () => console.log('users created'),
      err => console.error('Failed to create users:', err)
    )
    .catch((err) => console.log(err));
  })




}

db.createDatabase('airbnb')
.then(cb);
