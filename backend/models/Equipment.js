const Sequelize = require('sequelize');
const db = require("../util/database");

const Equipment = db.define('equipment', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    uuid: {type: Sequelize.UUID, allowNull: false},
    equipment_type: {type: Sequelize.STRING, allowNull: false},
    vendor: {type: Sequelize.STRING, allowNull: false},
    model: {type: Sequelize.STRING, allowNull: false},
    serial_number: {type: Sequelize.STRING, allowNull: false},
    service_tag: {type: Sequelize.STRING, allowNull: true},
    os_type: {type: Sequelize.STRING, allowNull: true},
    os_version: {type: Sequelize.STRING, allowNull: true},
    sold_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    purchase_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    warranty_expires: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    end_of_life: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    install_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    internal_ip_address: {type: Sequelize.STRING, allowNull: true},
    external_ip_address: {type: Sequelize.STRING, allowNull: true},
    subnet_mask: {type: Sequelize.STRING, allowNull: true},
    gateway: {type: Sequelize.STRING, allowNull: true},
    primary_dns: {type: Sequelize.STRING, allowNull: true},
    secondary_dns: {type: Sequelize.STRING, allowNull: true},
    tertiary_dns: {type: Sequelize.STRING, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
}, {paranoid: true})

module.exports = Equipment;