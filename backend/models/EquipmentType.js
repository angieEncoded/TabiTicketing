const Sequelize = require('sequelize');
const db = require("../util/database");

const EquipmentType = db.define('equipment_type', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    name: {type: Sequelize.STRING, allowNull: false},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = EquipmentType;