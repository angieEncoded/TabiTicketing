const Sequelize = require('sequelize');
const db = require("../util/database");

const TicketHistory = db.define('ticket_history', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    action_performed: {type: Sequelize.TEXT, allowNull: false},
    time_performed: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.DataTypes.NOW}

}, {paranoid: true})

module.exports = TicketHistory;