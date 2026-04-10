const Sequelize = require('sequelize');
const db = require("../util/database");

const Equipment = db.define('equipment', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    equipment_type: {type: Sequelize.STRING, allowNull: true},
    vendor: {type: Sequelize.STRING, allowNull: true},
    model: {type: Sequelize.STRING, allowNull: true},
    os_version: {type: Sequelize.STRING, allowNull: true},
    os_name: {type: Sequelize.STRING, allowNull: true},
    firmare_version: {type: Sequelize.STRING, allowNull: true},
    purchase_date: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.DataTypes.NOW},
    sold_date: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.DataTypes.NOW},
    end_of_life: {type: Sequelize.DATE, allowNull: true},
    warranty_expires: {type: Sequelize.DATE, allowNull: true},
    internal_ip_address: {type: Sequelize.STRING, allowNull: true},
    external_ip_address: {type: Sequelize.STRING, allowNull: true},
    subnet_mask: {type: Sequelize.STRING, allowNull: true},
    gateway: {type: Sequelize.STRING, allowNull: true},
    primary_dns: {type: Sequelize.STRING, allowNull: true},
    secondary_dns: {type: Sequelize.STRING, allowNull: true},
    tertiary_dns: {type: Sequelize.STRING, allowNull: true},
    serial: {type: Sequelize.STRING, allowNull: true},
    product_number: {type: Sequelize.STRING, allowNull: true},
    service_tag: {type: Sequelize.STRING, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Equipment;