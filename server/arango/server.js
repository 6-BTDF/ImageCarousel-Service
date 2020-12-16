require('newrelic');
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const compression = require('compression');
const router = require('./router.js');

const port = 3001;

const app = express();
const PATH = path.join(__dirname, '/../../client/dist');
// app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(compression());

// app.use('/:id', express.static('../../client/dist'));
// $

app.use('/api/photo-carousel', router);
// app.get('/api/listings/:id', router.get);
app.use('/:id/', express.static(PATH));
app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})

