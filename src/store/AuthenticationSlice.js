
import { createSlice } from "@reduxjs/toolkit";

// set our initial state SET TO TRUE FOR EASE OF DEV - REMEMBER THAT THIS LOGIC FIRES OFF THE URLS
// WHICH ARE NEEDED FOR POPULATED STATE AND INDEXED DB, ADDED THE URLS TO THE STATE SLICE INITIAL STATE TO GET
// AROUND NO DATA POPULATING WITH THIS FOR TESTING
const initialAuthenticationState = { isAuthenticated: false, serverToken: undefined }

const authenticationSlice = createSlice({
    name: 'Authentication',
    initialState: initialAuthenticationState,
    reducers: {
        loginValid(state) { state.isAuthenticated = true },
        loginInvalid(state) { state.isAuthenticated = false },
        logout(state) { state.isAuthenticated = false }
    }
})

export const authenticationActions = authenticationSlice.actions
export default authenticationSlice.reducer;