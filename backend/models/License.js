const Sequelize = require('sequelize');
const db = require("../util/database");

const License = db.define('license', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    product_name: {type: Sequelize.STRING, allowNull: false},
    vendor_name: {type: Sequelize.STRING, allowNull: false},
    sold_date: {type: Sequelize.DATEONLY, allowNull: true},
    purchase_date: {type: Sequelize.DATEONLY, allowNull: true},
    expires: {type: Sequelize.DATE, allowNull: true},
    license_key: {type: Sequelize.TEXT, allowNull: true},
    license_file: {type: Sequelize.TEXT, allowNull: true},
    email_of_record: {type: Sequelize.TEXT, allowNull: true},
    end_of_life: {type: Sequelize.TEXT, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = License;