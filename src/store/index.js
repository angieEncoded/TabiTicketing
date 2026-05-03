import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./AuthenticationSlice";
import customerSliceReducer from "./CustomerSlice";
import selectedCustomerSliceReducer from "./SelectedCustomerSlice";
import urlSliceReducer from "./EndpointsSlice";
import ticketsSliceReducer from "./TicketSlice";
import contactSliceReducer from "./ContactSlice";
import technicianSliceReducer from "./TechnicianSlice";
import projectSliceReducer from "./ProjectSlice";

const store = configureStore({
    reducer: {
        cust: customerSliceReducer,
        scust: selectedCustomerSliceReducer,
        tick: ticketsSliceReducer,
        auth: authenticationSliceReducer,
        urls: urlSliceReducer,
        contacts: contactSliceReducer,
        technicians: technicianSliceReducer,
        projects: projectSliceReducer
    }
})

export default store