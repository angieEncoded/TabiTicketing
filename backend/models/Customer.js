const Sequelize = require('sequelize');
const db = require("../util/database");

const Customer = db.define('customer', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    customer_name: {type: Sequelize.STRING, allowNull: false},
    primary_phone: {type: Sequelize.STRING, allowNull: false},
    secondary_phone: {type: Sequelize.STRING, allowNull: true},
    fax: {type: Sequelize.STRING, allowNull: true},
    website: {type: Sequelize.TEXT, allowNull: true},
    email: {type: Sequelize.STRING, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    status: {type:Sequelize.STRING, allowNull: false},
    email_domain:  {type: Sequelize.TEXT, allowNull: true},
    email_host:  {type: Sequelize.TEXT, allowNull: true},
    isp:  {type: Sequelize.TEXT, allowNull: true},
    office_suite:  {type: Sequelize.TEXT, allowNull: true},
    server_domain:  {type: Sequelize.TEXT, allowNull: true},
    phone_system:  {type: Sequelize.TEXT, allowNull: true},
    data_backup:  {type: Sequelize.TEXT, allowNull: true},
    is_vendor: {type:Sequelize.BOOLEAN, allowNull: true, defaultValue: false},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
    
}, {paranoid: true})

module.exports = Customer;