const Sequelize = require('sequelize');
const db = require("../util/database");

const Ticket = db.define('ticket', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    title: {type: Sequelize.STRING, allowNull: false},
    agenda: {type: Sequelize.TEXT, allowNull: true},
    status: {type: Sequelize.TEXT, allowNull: true},
    priority: {type: Sequelize.TEXT, allowNull: true},
    description: {type: Sequelize.TEXT, allowNull: true},
    customer_solution: {type: Sequelize.TEXT, allowNull: true},
    tech_solution: {type: Sequelize.TEXT, allowNull: true},
    notes:  {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Ticket;