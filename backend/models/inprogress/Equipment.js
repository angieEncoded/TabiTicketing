const db = require("../util/database");

module.exports = class Equipment {
    constructor(id, customer, type, vendor, model, os_version, purchase_date, warranty_end_date, end_of_life, internal_ip_address, external_ip_address, subnet_mask, default_gateway, primary_dns,
        secondary_dns, serial_number, product_number, notes, added_by, updated_by, added_on, updated_on) {
        this.id = id;
        this.customer = customer;
        this.type = type;
        this.vendor = vendor;
        this.model = model;
        this.os_version = os_version;
        this.purchase_date = purchase_date;
        this.warranty_end_date = warranty_end_date;
        this. end_of_life = end_of_life;
        this. internal_ip_address = internal_ip_address;
        this.external_ip_address = external_ip_address;
        this.subnet_mask = subnet_mask;
        this.default_gateway = default_gateway;
        this.secondary_dns = secondary_dns;
        this.serial_number = serial_number;
        this.product_number = product_number;
        this.notes = notes;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllEquipment() {
        return db.execute("select * from equipment")
    }

}