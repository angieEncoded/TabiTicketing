// Contacts associated with customers
const db = require("../util/database");
module.exports = class Contact {

    constructor(id, first_name, middle_name, last_name, job_title, home_phone, work_phone, cell_phone, extension, notes, customer, added_by, updated_by, added_on, updated_on) {
        this.id = id;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.job_title = job_title;
        this.home_phone = home_phone;
        this.work_phone = work_phone;
        this.cell_phone = cell_phone;
        this.extension = extension;
        this.notes = notes;
        this.customer = customer;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllContacts() {
        return db.execute("select * from contacts")
    }

}