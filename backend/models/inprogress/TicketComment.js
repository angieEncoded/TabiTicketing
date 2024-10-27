module.exports = class TicketComment {
    constructor(id, comment, ticket, added_by, updated_by, added_on, updated_on) {

        this.id = id;
        this.comment = comment;
        this.ticket = ticket;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllTickets() {
        return db.execute("select * from tickets")
    }
}