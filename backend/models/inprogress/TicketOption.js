module.exports = class TicketOption {
    constructor(id, option, type, added_by, updated_by, added_on, updated_on) {

        this.id = id;
        this.option = option;
        this.type = type;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllTicketOptions() {
        return db.execute("select * from tickets")
    }
}