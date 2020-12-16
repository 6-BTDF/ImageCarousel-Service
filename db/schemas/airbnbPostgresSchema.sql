DROP SCHEMA airbnb CASCADE;
CREATE SCHEMA airbnb;

CREATE TABLE airbnb.users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  email VARCHAR(60) NOT NULL
);

CREATE TABLE airbnb.favorite_list (
  favorite_list_id SERIAL PRIMARY KEY,
  list_name VARCHAR(80) NOT NULL,
  listing_details_id INT REFERENCES airbnb.listing_details(listing_details_id),
  user_id INT REFERENCES airbnb.users(user_id)
);

CREATE TABLE airbnb.listing_details (
  listing_details_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES airbnb.users(user_id),
  listing_name VARCHAR(60) NOT NULL,
  listing_description VARCHAR(200) NOT NULL,
  listing_location VARCHAR(100) NOT NULL,
  listing_num_reviews SMALLINT,
  listing_stars DECIMAL,
  guests SMALLINT,
  bedrooms SMALLINT,
  baths DECIMAL,
  weekday_rate SMALLINT,
  weekend_event_rate SMALLINT,
  photos VARCHAR[],
  fav_pic VARCHAR(100) NOT NULL
);
