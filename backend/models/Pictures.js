const Sequelize = require('sequelize');
const db = require("../util/database");

const Picture = db.define('picture', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    title: {type: Sequelize.STRING, allowNull: false},
    url: {type: Sequelize.TEXT, allowNull: false},
    notes:  {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Picture