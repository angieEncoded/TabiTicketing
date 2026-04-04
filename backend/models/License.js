const Sequelize = require('sequelize');
const db = require("../util/database");

const License = db.define('license', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    product_name: {type: Sequelize.STRING, allowNull: false},
    vendor_name: {type: Sequelize.STRING, allowNull: false},
    purchase_date: {type: Sequelize.DATE, allowNull: true},
    expires: {type: Sequelize.DATE, allowNull: true},
    license_key: {type: Sequelize.TEXT, allowNull: true},
    license_file: {type: Sequelize.TEXT, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    end_of_life: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = License;