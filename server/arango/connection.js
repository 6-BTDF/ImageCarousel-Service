const { Database, aql } = require("arangojs");

const arangoDb = new Database({
  url: "http://18.144.161.23:8529",
  agentOptions: {
    maxSockets: 350,
    keepAlive: true
  },
  LoadBalancingStrategy: 'ROUND_ROBIN',
  auth: {
    password: 'pass',
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



