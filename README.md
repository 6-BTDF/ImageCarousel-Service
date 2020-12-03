# System Design Capstone

 Inherited Project to build & optimize database and server to handle webscale traffic\
 Frontend Owner: Timothy Akana\
 Backend Owner: Harry Clemente


# Image Carousel

## Create
**Method:** POST - add a favorite listing\
**Endpoint:** '/photo-carousel/favorites/'\
**Path Params:** listing ID\
**Request Body:** 

```JSON
        {
          userId: Number,
          listName: String,
          favoriteLists: Array,
          favoritePicture: String,
        }
```

**Response [Object]:** HTTP Status Code 201

## Read:
**Method:** GET - get photos for listing\
**Endpoint:** '/photo-carousel/:id/photos/'\
**Path Params:** listing ID\
**Request Body:** { listingId: id }\
**Response [Object]:** 

```JSON
    {
      id: Number,
      listingId: Number,
      photo: String,
      description: String,
      listingName: String,
      listingStars: Number,
      listingNumReviews: Number,
      listingLocation: String,
    }
```

## Update:
**Method:** PUT\
**Endpoint:** \
**Request Body:** \
**Response Object:** HTTP Status Code 200

## Delete:
**Method:** DELETE\
**Endpoint:** \
**Request Body:** \
**Response Object:** HTTP Status Code 200

## Related Projects

  - https://github.com/6-BTDF/reservations-service
  - https://github.com/6-BTDF/reviews-service
  - https://github.com/6-BTDF/more-places-proxy
  - https://github.com/6-BTDF/proxy-placeholder

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Style Guide
Refer to the [AirBnb Style Guide](https://github.com/airbnb/javascript).

