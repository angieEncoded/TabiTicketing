
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialProjectState = { projects: [] } // heh, this needs an array its not an object

const projectSlice = createSlice({
    name: 'Projects',
    initialState: initialProjectState,
    reducers: {
        loadProjectData(state, data) {
            state.projects = data.payload
        }
    }
})

export const projectActions = projectSlice.actions
export default projectSlice.reducer;