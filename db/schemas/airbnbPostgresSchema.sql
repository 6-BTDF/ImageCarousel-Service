DROP SCHEMA airbnb CASCADE;
CREATE SCHEMA airbnb;

CREATE TABLE airbnb.users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
);

CREATE TABLE airbnb.favorite_list (
  listing_id SERIAL PRIMARY KEY,
  listing_name VARCHAR(100) REFERENCES listing_details(listing_name),
  user_id INT REFERENCES users(user_id),
  fav_pic : VARCHAR(100) REFERENCES listing_details(fav_pic),
);

CREATE TABLE airbnb.listing_details (
  listing_details_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  listing_name VARCHAR(100) NOT NULL,
  listing_description VARCHAR(250) NOT NULL,
  listing_location VARCHAR(100) NOT NULL,
  listing_num_reviews SMALLINT,
  listing_stars DECIMAL,
  guests SMALLINT,
  bedrooms SMALLINT,
  baths DECIMAL,
  weekday_rate SMALLINT,
  weekend_event_rate SMALLINT,
  photos VARCHAR[],
  fav_pic : VARCHAR(100) NOT NULL,
);
