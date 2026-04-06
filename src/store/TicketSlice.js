
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialTicketsState = { tickets: [] } // heh, this needs an array its not an object

const ticketsSlice = createSlice({
    name: 'Tickets',
    initialState: initialTicketsState,
    reducers: {
        loadTicketData(state, data) {
            state.tickets = data.payload
        }
    }
})

export const ticketsActions = ticketsSlice.actions
export default ticketsSlice.reducer;