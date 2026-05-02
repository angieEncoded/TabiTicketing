
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialTechnicianState = { technicians: [] } // heh, this needs an array its not an object

const technicianSlice = createSlice({
    name: 'Technicians',
    initialState: initialTechnicianState,
    reducers: {
        loadTechnicianData(state, data) {
            state.technicians = data.payload
        }
    }
})

export const technicianActions = technicianSlice.actions
export default technicianSlice.reducer;