
import { createSlice } from "@reduxjs/toolkit";

const initialSelectedCustomerState = { customer: {} }

const selectedCustomerSlice = createSlice({
    name: 'SelectedCustomer',
    initialState: initialSelectedCustomerState,
    reducers: {
        loadCustomerData(state, data) {
            state.customer = data.payload
        },
        clearCustomerData(state, data) {
            state.customer = {}
        }
    }
})

export const selectedCustomerActions = selectedCustomerSlice.actions
export default selectedCustomerSlice.reducer;