// arangoimport --file "./db/data/userData.csv" --type csv --collection "users" --server.database "airbnb"


// arangoimport --file "./db/data/listingData.csv" --type csv --collection "listings" --server.database "airbnb"

// arangoimport --file "./db/data/listData.csv" --type csv --collection "favorite_lists" --server.database "airbnb"

// arangoimport --file "./db/data/listingDetailsData.csv" --type csv --collection "listings" --server.database "airbnb"

// arangoimport --file "./db/data/listListingEdgeData.csv" --type csv --collection "edges" --server.database "airbnb"

// arangoimport --file "./db/data/userListEdgeData.csv" --type csv --collection "edges" --server.database "airbnb"

var Database = require('arangojs').Database;
var db = new Database();
const username = 'root';
const password = '';
db.useBasicAuth(username, password);
db.dropDatabase('airbnb');

function cb() {
  db.useDatabase('airbnb');
  var userSchema = {
    "message": "Failed schema validation for users",
    "level": "moderate",
    "rule": {
      "properties": {
        "first_name": {
          "type": "string"
        },
        "last_name": {
          "type": "string"
        },"email": {
          "type": "string"
        }
      },
      "required": [
        "user_id",
        "first_nume",
        "last_name",
        "email"
      ]
    }
  };
  var favoriteListSchema = {
    "message": "Failed schema validation for listings",
    "level": "moderate",
    "rule": {
      "list": {
        "list_id": {
          "type": "number"
        },
        "user_id": {
          "type": "string"
        },
        "listing_name": {
          "type": "string"
        },
        "fav_pic": {
          "type": "string"
        }
      },
      "required": [
        "listing_id",
        "user_id",
        "listing_name",
        "fav_pic"
      ]
    }
  };
  var listingDetailsSchema = {
    "message": "Failed schema validation for listing details",
    "level": "moderate",
    "rule": {
      "properties": {
        "property_id": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "listing_name": {
          "type": "string"
        },
        "listing_stars": {
          "type": "string"
        },
        "listing_num_reviews": {
          "type": "number"
        },
        "listing_location": {
          "type": "string"
        },
        "guests": {
          "type": "number"
        },
        "bedrooms": {
          "type": "number"
        },
        "baths": {
          "type": "number"
        },
        "weekday_rate": {
          "type": "number"
        },
        "weekend_event_rate": {
          "type": "number"
        },
        "photos": {
          "type": "array"
        },
        "fav_pic": {
          "type": "string"
        }
      },
      "required": [
        "property_id",
        "description",
        "listing_name",
        "listing_location"
      ]
    }
  };
  var edgeSchema = {
    rule: {
      properties: {
        _to: {type: "string"},
        _from: {type: "string"},
      },
      required: ["_to", "_from"]
    },
    level: "moderate",
    message: "Failed schema validation for edges"
};
  var propertyCollection = db.collection('properties');
  var edgeCollection = db.collection('edges');
  var userCollection = db.collection('users');
  var listingCollection = db.collection('listings');
  propertyCollection.create()
  .then(
    () => console.log('Collection created');
    err => console.error('Failed to create collection:', err)
  )
  .then(() => {
    userCollection.create()
    .then(
    () => console.log('Collection created');
    err => console.error('Failed to create collection:', err)
  )
  })
  .then(() => {
    listingCollection.create().then(
      () => console.log('Collection created'),
      err => console.error('Failed to create collection:', err)
    )
  })
  .then(() => {
    edgeCollection.create().then(
      () => console.log('Collection created'),
      err => console.error('Failed to create collection:', err)
    )
  })
  .catch((err) => console.log(err));

  // listingCollection.create({ 'listingSchema': listingSchema})
  // .then(
  //   () => console.log('listing collection created')
  // )
  // .then(() => {
  //   userCollection.create({ 'userSchema': userSchema})
  //   .then(
  //     () => console.log('user collection created')
  //     )
  //     .catch((err) => console.log(err))
  //   .then(() => {
  //     edgeCollection.create({'edgeSchema': edgeSchema})
  //     .then(
  //       () => console.log('edge collection created')
  //     )
  //     .catch((err) => console.log(err))
  //   .then( () => {
  //     propertyCollection.create({'propertySchema': propertySchema})
  //     .then(
  //       () => console.log('property collection created')
  //     )
  //     .catch((err) => console.log(err))
  //   })
  //   })
  //   .catch((err) => console.log(err))
  // })
}

db.createDatabase('airbnb')
.then(cb);
