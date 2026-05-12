
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialTicketTasksState = { ticket_tasks: [] } // heh, this needs an array its not an object

const ticketTasksSlice = createSlice({
    name: 'TicketTasks',
    initialState: initialTicketTasksState,
    reducers: {
        loadTicketTasksData(state, data) {
            state.ticket_tasks = data.payload
        }
    }
})

export const ticketTasksActions = ticketTasksSlice.actions
export default ticketTasksSlice.reducer;