const Sequelize = require('sequelize');
const db = require("../util/database");

const TicketTime = db.define('ticket_time', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    start_task_name: {type: Sequelize.TEXT, allowNull: false},
    end_task_name: {type: Sequelize.TEXT, allowNull: true},
    start_time: {type: Sequelize.DATE, allowNull: false},
    end_time: {type: Sequelize.DATE, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = TicketTime;