import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./AuthenticationSlice";
import customerSliceReducer from "./CustomerSlice"
import urlSliceReducer from "./EndpointsSlice";

const store = configureStore({
    reducer: {
        cust: customerSliceReducer,
        auth: authenticationSliceReducer,
        urls: urlSliceReducer,
    }
})

export default store