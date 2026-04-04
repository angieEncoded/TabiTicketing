const Sequelize = require('sequelize');
const db = require("../util/database");

const TicketTime = db.define('ticket_time', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    start_time: {type: Sequelize.DATE, allowNull: true},
    end_time: {type: Sequelize.DATE, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = TicketTime;