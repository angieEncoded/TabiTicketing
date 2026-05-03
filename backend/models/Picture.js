const Sequelize = require('sequelize');
const db = require("../util/database");

const Picture = db.define('picture', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    location: {type: Sequelize.STRING, allowNull: true},
    picture_file: {type: Sequelize.TEXT, allowNull: false},
    notes:  {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = Picture