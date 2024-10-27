// Contacts associated with customers
const db = require("../util/database");


module.exports = class License {

    constructor(id, product, purchase_date, expiration_date, end_of_life, customer, license_key, license_file, notes, added_by, updated_by, added_on, updated_on) {
        this.id = id;;
        this.product = product;
        this.purchase_date = purchase_date;
        this.expiration_date = expiration_date;
        this.end_of_life = end_of_life;
        this.customer = customer;
        this.license_key = license_key;
        this.license_file = license_file;
        this.notes = notes;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllLicenses() {
        return db.execute("select * from licenses")
    }

}