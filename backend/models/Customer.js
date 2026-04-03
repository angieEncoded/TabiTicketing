const Sequelize = require('sequelize');
const db = require("../util/database");

const Customer = db.define('customer', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.TEXT, allowNull: false},
    customer_name: {type: Sequelize.STRING, allowNull: false},
    primary_phone: {type: Sequelize.STRING, allowNull: false},
    secondary_phone: {type: Sequelize.STRING, allowNull: true},
    fax: {type: Sequelize.STRING, allowNull: true},
    website: {type: Sequelize.TEXT, allowNull: true},
    email: {type: Sequelize.STRING, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    status: {type:Sequelize.STRING, allowNull: false},
    county: {type: Sequelize.STRING, allowNull: false},
    billing_one: {type: Sequelize.STRING, allowNull: false},
    billing_two: {type: Sequelize.STRING, allowNull: true},
    billing_city: {type: Sequelize.STRING, allowNull: false},
    billing_state: {type: Sequelize.STRING, allowNull: false},
    billing_zip: {type: Sequelize.STRING, allowNull: false},
    billing_country: {type: Sequelize.STRING, allowNull: false},
    shipping_one: {type: Sequelize.STRING, allowNull: true},
    shipping_two: {type: Sequelize.STRING, allowNull: true},
    shipping_city: {type: Sequelize.STRING, allowNull: true},
    shipping_state: {type: Sequelize.STRING, allowNull: true},
    shipping_zip: {type: Sequelize.STRING, allowNull: true},
    shipping_country: {type: Sequelize.STRING, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},

})

module.exports = Customer;