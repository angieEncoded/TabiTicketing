import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./AuthenticationSlice";
import customerSliceReducer from "./CustomerSlice"
import urlSliceReducer from "./EndpointsSlice";
import ticketsSliceReducer from "./TicketSlice";

const store = configureStore({
    reducer: {
        cust: customerSliceReducer,
        tick: ticketsSliceReducer,
        auth: authenticationSliceReducer,
        urls: urlSliceReducer,
    }
})

export default store