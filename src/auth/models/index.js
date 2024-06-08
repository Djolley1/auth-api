'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user');
// const { Col } = require('sequelize/lib/utils');
const DataCollection = require('./data-collection')

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');

const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? {logging: false} : {});
const users = userModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  userModel: new DataCollection (users),
};