import { createSlice } from "@reduxjs/toolkit";

const initialSelectedTicketState = { ticket: {} }

const selectedTicketSlice = createSlice({
    name: 'SelectedTicket',
    initialState: initialSelectedTicketState,
    reducers: {
        loadTicketData(state, data) {
            state.ticket = data.payload
        },
        clearTicketData(state, data) {
            state.ticket = {}
        }
    }
})

export const selectedTicketActions = selectedTicketSlice.actions
export default selectedTicketSlice.reducer;