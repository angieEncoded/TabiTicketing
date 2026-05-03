const Sequelize = require('sequelize');
const db = require("../util/database");

const Project = db.define('project', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    agenda: {type: Sequelize.TEXT, allowNull: true},
    status: {type: Sequelize.TEXT, allowNull: false},
    priority: {type: Sequelize.TEXT, allowNull: true},
    description: {type: Sequelize.TEXT, allowNull: true},
    customer_solution: {type: Sequelize.TEXT, allowNull: true},
    tech_solution: {type: Sequelize.TEXT, allowNull: true},
    project_type: {type:Sequelize.TEXT, allowNull: true},
    notes:  {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = Project;