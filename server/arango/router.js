const { Database, aql } = require("arangojs");
const express = require('express')
const router = express.Router();
const connection = require('./connection.js')
// const arangoDb = new Database();
// arangoDb.useDatabase('airbnb');
// arangoDb.useBasicAuth('root', '');
// const listings = arangoDb.collection('listings');

router.route('/:id/photos')
.get(async (req, res) => {
  const listingId = req.params.id;
  // console.log(listingId);
  try {
    const listing = await connection.query(aql`
    FOR home IN listings
    FILTER home._key == ${listingId}
    RETURN home
    `);
    for await (const item of listing) {
      // console.log(item);
      res.json(item);
    }
  } catch(err) {
    // console.log(err)
    res.sendStatus(404);
  }
});

router.route('/favorites/:id')
.get(async (req, res) => {
  const listId = req.params.id;
  // console.log(listingId);
  try {
    const listing = await connection.query(aql`
    FOR list IN favorite_lists
    FILTER list._key == ${listId}
    for v,e,p in 1..3 outbound
    list listToListingsEdges
    limit 10
    return e._to
    `);
    for await (const item of listing) {
      // console.log(item);
      res.json(item);
    }
  } catch(err) {
    console.log(err)
    res.sendStatus(404);
  }
});

// router.get = ('/:id', async (req, res) => {
//   const listingId = req.params.id;
//   try {
//     const listing = await arangoDb.query
//     (aql`FOR home IN listings
//     FILTER home._key == ${listingId}
//     RETURN home`);
//     for await (const item of listing) {
//       // console.log(item);
//       res.json(item);
//     }
//   } catch(err) {
//     console.log(err);
//     res.sendStatus(404);
//   }
// });

module.exports = router;