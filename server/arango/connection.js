const { Database, aql } = require("arangojs");

const arangoDb = new Database({
  agentOptions: {
    maxSockets: 350,
    keepAlive: true
  },
  LoadBalancingStrategy: 'ROUND_ROBIN',
  auth: {
    password: '',
    username: 'root'
  },
  QueryOptions: {
    stream: true,
  }
});
arangoDb.useDatabase('airbnb');
// arangoDb.useBasicAuth('root', '');
// const listing = arangoDb.collection('listings');

module.exports = arangoDb;



