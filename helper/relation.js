const sequelize = require("../models/index").sequelize;
const { DataTypes } = require("sequelize");

const User = require("../models/user")(sequelize, DataTypes);

module.exports = {
  User,
};
