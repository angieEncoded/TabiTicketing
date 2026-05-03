const Sequelize = require('sequelize');
const db = require("../util/database");

const OnSiteVisit = db.define('on_site_visit', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    reason: {type: Sequelize.STRING, allowNull: false},
    scheduled_date: {type: Sequelize.DATEONLY, allowNull: true},
    notes: {type: Sequelize.TEXT, allowNull: true},
    added_by: {type: Sequelize.STRING, allowNull: false},
    updated_by: {type:Sequelize.STRING, allowNull: false},
    uuid: {type: Sequelize.UUID, allowNull: false},
}, {paranoid: true})

module.exports = OnSiteVisit;