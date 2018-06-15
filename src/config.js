'use strict';

const config = require('../config');
const env = require('./env');


module.exports = (() => {
  const db = getDb();

  return {
    db: () => db,
    get,
  };
})();

function get() {
  return config[env.key()] || {};
}

function validateConfig() {
  // TODO: validate configuration to make sure it has everything to run and matches a defined schema
}

function getDb() {
  const dbConfig = config[env.key()].db;
  const url = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}`;
  return url;
}
