const Sequelize = require('sequelize');
const db = require("../util/database");

const Firewall = db.define('firewall', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    purpose:  {type: Sequelize.STRING, allowNull: false}, // primary, secondary, other
    status: {type: Sequelize.STRING, allowNull: false},
    vendor: {type: Sequelize.STRING, allowNull: false},
    model: {type: Sequelize.STRING, allowNull: false}, 
    serial_number: {type: Sequelize.STRING, allowNull: true},
    firmware_version: {type: Sequelize.STRING, allowNull: true},

    isp: {type: Sequelize.STRING, allowNull: true},
    webui_address: {type: Sequelize.TEXT, allowNull: true},
    isp_ip_type: {type: Sequelize.STRING, allowNull: true},
    external_ip_address: {type: Sequelize.STRING, allowNull: true},
    subnet_mask: {type: Sequelize.STRING, allowNull: true},
    gateway: {type: Sequelize.STRING, allowNull: true},
    primary_dns: {type: Sequelize.STRING, allowNull: true},
    secondary_dns: {type: Sequelize.STRING, allowNull: true},
    tertiary_dns: {type: Sequelize.STRING, allowNull: true},
    internal_ip_address: {type: Sequelize.STRING, allowNull: true},
    primary_subnet: {type: Sequelize.STRING, allowNull: true},
    secondary_subnet: {type: Sequelize.STRING, allowNull: true},
    dmz: {type: Sequelize.STRING, allowNull: true},
    wifi: {type: Sequelize.STRING, allowNull: true},

    notes:  {type: Sequelize.TEXT, allowNull: true},
    sold_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    purchase_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    warranty_expires: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    end_of_life: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    install_date: {type: Sequelize.DATEONLY, allowNull: true, defaultValue: '2026-04-1'},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = Firewall;