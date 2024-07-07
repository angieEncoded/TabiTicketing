const db = require("../util/database");
module.exports = class Address {

    constructor(id, type, customer, address_one, address_two, city, state, zip, country, added_by, updated_by, added_on, updated_on, deleted) {
        this.id = id;
        this.type = type;
        this.customer = customer;
        this.address_one = address_one;
        this.address_two = address_two;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
        this.deleted = deleted;
    }

    static fetchAllUsers() {
        return db.execute("select * from customers")
    }

}