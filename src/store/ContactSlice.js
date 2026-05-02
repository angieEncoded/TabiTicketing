
import { createSlice } from "@reduxjs/toolkit";

// set our initial state
const initialContactsState = { contacts: [] } // heh, this needs an array its not an object

const contactsSlice = createSlice({
    name: 'Contacts',
    initialState: initialContactsState,
    reducers: {
        loadContactsData(state, data) {
            state.contacts = data.payload
        }
    }
})

export const contactsActions = contactsSlice.actions
export default contactsSlice.reducer;