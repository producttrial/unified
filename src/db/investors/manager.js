'use strict';

const config = require('../../config');
const mongoClient = require('mongodb').MongoClient;
const moment = require('moment');

module.exports = {
  create,
  readSingle,
  update,
};

function create(req) {
  // TODO: implement this
}

function readSingle(req) {
  const url = config.db();
  const dbConfig = config.get().db;

  return mongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully');
      const db = client.db(dbConfig.database);
      return db.collection('Investors').findOne({id: req.params.investorId})
        .then((data) => {
          return data;
        })
        .catch((err) => {
          client.close();
          // TODO: process the error
        });
    });
}

function update(req) {
  // TODO: validate request query
  const url = config.db();
  const dbConfig = config.get().db;

  return mongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully');
      const db = client.db(dbConfig.database);
      // TODO: move this query, smarter update
      const query = {
        id: req.body.id,
        name: req.body.name,
        password: req.body.password,
        active: req.body.active,
        'last_password_changed': moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      };

      return db.collection('Investors').findOneAndUpdate({id: req.params.investorId}, query)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          client.close();
          // TODO: process the error
        });
    });
}