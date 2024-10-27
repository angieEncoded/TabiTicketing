module.exports = class TicketHistory {
    constructor(id, action, ticket, taken_by, taken_on) {

        this.id = id;
        this.action = action;
        this.ticket = ticket;
        this.taken_by = taken_by;
        this.taken_on = taken_on;
    }

    static fetchAllHistory() {
        return db.execute("select * from ticket_history")
    }
}