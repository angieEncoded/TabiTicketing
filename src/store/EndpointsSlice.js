
import { createSlice } from "@reduxjs/toolkit";
import localURLS from "../util/apiPaths.json" // for dev ONLY

// const initialEndpointState = { urls: {} }// reactivate when login logic used
const initialEndpointState = { urls: localURLS }// for dev ONLY


const endpointSlice = createSlice({
    name: 'Endpoints',
    initialState: initialEndpointState,
    reducers: {
        loadEndpoints(state, data) {
            state.urls = data.payload
        }
    }
})

export const endpointActions = endpointSlice.actions
export default endpointSlice.reducer;