const Sequelize = require('sequelize');
const db = require("../util/database");

const TicketStatus = db.define('ticket_status', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    priority: {type: Sequelize.STRING, allowNull: false},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = TicketStatus;