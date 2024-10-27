const db = require('../../util/database')

module.exports = class User {
    constructor(id, email, password, first_name, middle_name, last_name, salutation, role, title, department, extension, officephone, cellphone, street, city, state, zip, country, notes, added_by, updated_by, added_on, updated_on) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.salutation = salutation;
        this.role = role;
        this.title = title;
        this.department = department;
        this.extension = extension;
        this.officephone = officephone;
        this.cellphone = cellphone;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.notes = notes;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static selectAll() {
        return db.execute("select * from users")
    }

}
