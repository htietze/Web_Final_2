'use strict';
// I'm not sure if this is used to setup the table or just saved to keep track of it,
// a place where the data types are recorded, and the table name set
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define('States', {
    name: DataTypes.STRING,
    visited: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    zoom: DataTypes.INTEGER,
    journal: DataTypes.STRING(1000)
  }, {});
  States.associate = function(models) {
    // associations can be defined here
  };
  return States;
};