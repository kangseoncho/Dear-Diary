const Sequelize = require('sequelize');
const pg = require('pg');

//set DB connection
//first argument is the database name (should be same as postgres CLI DB name, second parameter is fixed, password doesnt matter)
const connection = new Sequelize('kangseoncho', 'kangseoncho', 'kangseoncho', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

//create DB Model
const Entries = connection.define('entries',{
    user: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    title: Sequelize.STRING,
    logTime: Sequelize.STRING,
    entry: Sequelize.TEXT
});

//create DB if one does not exist already
connection.sync();

module.exports = Entries;