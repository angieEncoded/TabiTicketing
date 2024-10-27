const db = require("../util/database");
module.exports = class LicenseType {

    constructor(id, vendor, type, price, notes, added_by, updated_by, added_on, updated_on) {
        this.id = id;
        this.vendor = vendor;
        this.type = type;
        this.price = price;
        this.notes = notes;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllLicenseTypes() {
        return db.execute("select * from license_types")
    }

}