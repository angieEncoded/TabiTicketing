const Sequelize = require('sequelize');
const db = require("../util/database");

const Attachment = db.define('ticket', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    title: {type: Sequelize.STRING, allowNull: false},
    notes:  {type: Sequelize.TEXT, allowNull: true},
    attachment: {type: Sequelize.TEXT, allowNull: false},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Attachment;