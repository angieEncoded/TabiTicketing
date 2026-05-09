const Sequelize = require('sequelize');
const db = require("../util/database");

const TicketTime = db.define('ticket_time', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    start_task_name: {type: Sequelize.TEXT, allowNull: false},
    start_time: {type: Sequelize.DATE, allowNull: false},
    end_time: {type: Sequelize.DATE, allowNull: true},
    status:  {type: Sequelize.STRING, allowNull: true, defaultValue: ''},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = TicketTime;