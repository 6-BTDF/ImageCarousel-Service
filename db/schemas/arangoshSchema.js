db._createDatabase('airbnb');
db._useDatabase('airbnb');

var listingSchema = {
  'rule' : {
    'type' : 'object',
    'properties' : {
      'listingId' : {
        'type' : 'number',
      },
      'listingName' : {
        'type' : 'string',
      },
      'listingDescription' : {
        'type' : 'string',
      },
      'listingLocation' : {
        'type' : 'string',
      },
      'listingStars' : {
        'type' : 'number',
      },
      'listingNumReviews' : {
        'type' : 'number',
      },
      'photos' : {
        'type' : 'array',
      },
    },
  },
}
db._create('listings', { 'listingSchema': listingSchema});

var userSchema = {
  rule : {
    type       : 'object',
    properties : {
      userId   : {
        type : 'number'
      },
      userName : {
        type : 'string'
      },
      favLists : {
        type : 'array',
        list : {
          title      : 'list',
          type       : 'object',
          properties : {
            listId    : {
              type : 'number'
            },
            listName  : {
              type : 'string'
            },
            favorites : {
              type  : 'array',
              items : {
                type        : 'number',
                description : 'listingId of favorite'
              }
            }
          }
        }
      }
    }
  }
};

db._create('users', {'userSchema': userSchema});