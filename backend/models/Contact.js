const Sequelize = require('sequelize');
const db = require("../util/database");

const Contact = db.define('contact', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    salutation: {type: Sequelize.STRING, allowNull: true},
    first_name: {type: Sequelize.STRING, allowNull: false},
    middle_name: {type: Sequelize.STRING, allowNull: true},
    last_name: {type: Sequelize.STRING, allowNull: true},
    primary_phone: {type: Sequelize.STRING, allowNull: true},
    extension: {type: Sequelize.STRING, allowNull: true},
    secondary_phone: {type: Sequelize.STRING, allowNull: true},
    fax: {type: Sequelize.STRING, allowNull: true},
    job_title: {type: Sequelize.TEXT, allowNull: true},
    email: {type: Sequelize.STRING, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},

}, {paranoid: true})

module.exports = Contact;