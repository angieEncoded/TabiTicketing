import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./AuthenticationSlice";
import customerSliceReducer from "./CustomerSlice";
import selectedCustomerSliceReducer from "./SelectedCustomerSlice";
import ticketsSliceReducer from "./TicketSlice";
import contactSliceReducer from "./ContactSlice";
import technicianSliceReducer from "./TechnicianSlice";
import projectSliceReducer from "./ProjectSlice";
import tabSliceReducer from "./TabDisplaySlice";
import selectedTicketSliceReducer from "./SelectedTicketSlice";
import ticketTasksSliceReducer from "./TicketTasksSlice";

const store = configureStore({
    reducer: {
        cust: customerSliceReducer,
        scust: selectedCustomerSliceReducer,
        ticket: ticketsSliceReducer,
        auth: authenticationSliceReducer,
        contacts: contactSliceReducer,
        technicians: technicianSliceReducer,
        projects: projectSliceReducer,
        tab: tabSliceReducer,
        sticket: selectedTicketSliceReducer,
        ttasks: ticketTasksSliceReducer
    }
})

export default store