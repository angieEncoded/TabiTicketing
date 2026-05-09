
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialTabState = { tab: {currentTab : "MAIN", ticketId: null} }

const tabSlice = createSlice({
    name: 'Tab',
    initialState: initialTabState,
    reducers: {
        loadTabData(state, data) {
            console.log(data)
            state = data.payload
        }
    }
})

export const tabActions = tabSlice.actions
export default tabSlice.reducer;