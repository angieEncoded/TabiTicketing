const db = require("../util/database");
module.exports = class Customer {

    constructor(
        id,
        customer_name,
        primary_phone,
        fax,
        secondary_phone,
        website,
        notes,
        billing_address_one,
        billing_address_two,
        billing_address_city,
        billing_address_state,
        billing_address_zip,
        billing_address_country,
        shipping_address_one,
        shipping_address_two,
        shipping_address_city,
        shipping_address_state,
        shipping_address_zip,
        shipping_address_country,
        added_by,
        updated_by,
        added_on,
        updated_on,
        status
    ) {
        this.id = id;
        this.customer_name = customer_name;
        this.primary_phone = primary_phone;
        this.fax = fax;
        this.secondary_phone = secondary_phone;
        this.website = website;
        this.notes = notes;
        this.billing_address_one = billing_address_one;
        this.billing_address_two = billing_address_two;
        this.billing_address_city = billing_address_city;
        this.billing_address_state = billing_address_state;
        this.billing_address_zip = billing_address_zip;
        this.billing_address_country = billing_address_country;
        this.shipping_address_one = shipping_address_one;
        this.shipping_address_two = shipping_address_two;
        this.shipping_address_city = shipping_address_city;
        this.shipping_address_state = shipping_address_state;
        this.shipping_address_zip = shipping_address_zip;
        this.shipping_address_country = shipping_address_country;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
        this.status = status;
    }

    static fetchActive() {
        return db.execute("select * from customers where status = 'active'")
    }

}