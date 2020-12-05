DROP SCHEMA airbnb CASCADE;
CREATE SCHEMA airbnb;

CREATE TABLE airbnb.users (
  userId SERIAL PRIMARY KEY,
  userName VARCHAR(100) NOT NULL
);

CREATE TABLE airbnb.listings (
  listingName VARCHAR(100) NOT NULL,
  userId INT REFERENCES users(userId),
);

--JOIN
CREATE TABLE airbnb.favoriteListings (
  favoriteId SERIAL PRIMARY KEY,
  listingId INT REFERENCES listingDetails(listingId),
  userId INT REFERENCES users(userId),
  order SMALLINT NOT NULL
  -- order 1 is favorite pic
)

CREATE TABLE airbnb.listingDetails (
  listingId SERIAL PRIMARY KEY,
  listingName VARCHAR(100) NOT NULL,
  listingDescription VARCHAR(250) NOT NULL,
  listingLocation VARCHAR(100) NOT NULL,
  listingNumReviews SMALLINT,
  photos VARCHAR[]
);
