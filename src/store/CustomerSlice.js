
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialCustomersState = { customers: [] } // heh, this needs an array its not an object

const customersSlice = createSlice({
    name: 'Customers',
    initialState: initialCustomersState,
    reducers: {
        loadCustomerData(state, data) {
            state.customers = data.payload
        }
    }
})

export const customersActions = customersSlice.actions
export default customersSlice.reducer;