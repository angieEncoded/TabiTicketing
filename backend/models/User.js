const Sequelize = require('sequelize');
const db = require("../util/database");

const User = db.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    salutation: {type: Sequelize.STRING, allowNull: true},
    first_name: {type: Sequelize.STRING, allowNull: false},
    middle_name: {type: Sequelize.STRING, allowNull: true},
    last_name: {type: Sequelize.STRING, allowNull: false},
    work_phone: {type: Sequelize.STRING, allowNull: true},
    extension: {type: Sequelize.STRING, allowNull: true},
    cell_phone: {type: Sequelize.STRING, allowNull: true},
    job_title: {type: Sequelize.TEXT, allowNull: true},
    work_email: {type: Sequelize.STRING, allowNull: false},
    personal_email: {type: Sequelize.STRING, allowNull: true},
    status: {type: Sequelize.STRING, allowNull: false},
    is_technician:  {type: Sequelize.STRING, allowNull: false},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = User;