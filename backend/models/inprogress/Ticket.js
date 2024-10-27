module.exports = class Ticket {
    constructor(id, customer, assigned_to, owned_by, title, status, priority, results, description, solution, added_by, updated_by, added_on, updated_on) {

        this.id = id;
        this.customer = customer;
        this.assigned_to = assigned_to;
        this.owned_by = owned_by;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.results = results;
        this.description = description;
        this.solution = solution;
        this.notes = notes;
        this.added_by = added_by;
        this.updated_by = updated_by;
        this.added_on = added_on;
        this.updated_on = updated_on;
    }

    static fetchAllTickets() {
        return db.execute("select * from tickets")
    }
}