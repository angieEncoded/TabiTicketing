const Sequelize = require('sequelize');
const db = require("../util/database");

const Address = db.define('address', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    type: {type: Sequelize.STRING, allowNull: false},
    street: {type: Sequelize.STRING, allowNull: false},
    additional: {type: Sequelize.STRING, allowNull: true},
    city: {type: Sequelize.STRING, allowNull: false},
    county: {type: Sequelize.STRING, allowNull: true},
    state: {type: Sequelize.STRING, allowNull: false},
    zip: {type: Sequelize.STRING, allowNull: false},
    country: {type: Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Address;