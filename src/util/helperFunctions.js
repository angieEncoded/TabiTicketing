import { customersActions } from "../store/CustomerSlice";
import { contactsActions } from "../store/ContactSlice";
import { technicianActions } from "../store/TechnicianSlice";
import { ticketsActions } from "../store/TicketSlice";
import { selectedCustomerActions } from "../store/SelectedCustomerSlice";
import { selectedTicketActions } from "../store/SelectedTicketSlice";
import { ticketTasksActions } from "../store/TicketTasksSlice";
import urls from "../util/apiPaths.json";

// Send in dispatcher for all these functions
//================================================================

// const customerTableResults = await getCustomerTableData(dispatch);
// if (customerTableResults.status !== 200) { toast.error(`${customerTableResults.status} - ${customerTableResults.message}`) }
const getCustomerTableData = async (dispatch) => {

    try {
        const customerData = await fetch(urls.customerAPI);
        if (!customerData.ok) { 
            return({status: customerData.status, message: customerData.statusText}) 
        }
        const customerJson = await customerData.json();
        if (customerJson.status === 200) {
            await dispatch(customersActions.loadCustomerData(customerJson.customers));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return customerJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }
}


// const ticketQueueResults = await getTicketQueueTableData(dispatch);
// if (ticketQueueResults.status !== 200) { toast.error(`${ticketQueueResults.status} - ${ticketQueueResults.message}`) }
const getTicketQueueTableData = async (dispatch) => {

    try {
        const ticketQueueData = await fetch(urls.ticketAPI);
        if (!ticketQueueData.ok) { 
            return({status: ticketQueueData.status, message: ticketQueueData.statusText}) 
        }
        const ticketQueueJson = await ticketQueueData.json();
        if (ticketQueueJson.status === 200) {
            await dispatch(ticketsActions.loadTicketData(ticketQueueJson.tickets));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return ticketQueueJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }
}

// const ticketTaskResults = await getTicketTasksData(dispatch);
// if (ticketTaskResults.status !== 200) { toast.error(`${ticketTaskResults.status} - ${ticketTaskResults.message}`) }
const getTicketTasksData = async(dispatch) => {

    try {
        const openTicketTasks = await fetch(`${urls.ticketAPI}/tasks`);
        if (!openTicketTasks.ok) { 
            return({status: openTicketTasks.status, message: openTicketTasks.statusText}) 
        }
        const openTicketTasksJson = await openTicketTasks.json();
        if (openTicketTasksJson.status === 200) {
            await dispatch(ticketTasksActions.loadTicketTasksData(openTicketTasksJson.tasks));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return openTicketTasksJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}






// const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
// if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
const getSelectedCustomerData = async (id, dispatch) => {
    try {
        const selectedCustomerData = await fetch(`${urls.customerAPI}/${id}`);
        if (!selectedCustomerData.ok) { 
            return({status: selectedCustomerData.status, message: selectedCustomerData.statusText}) 
        }
        const selectedCustomerJson = await selectedCustomerData.json();

        if (selectedCustomerJson.status === 200) {
            await dispatch(selectedCustomerActions.loadCustomerData(selectedCustomerJson.customer));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return selectedCustomerJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}

// const techniciansResults = await getTechnicians(dispatch);
// if (techniciansResults.status !== 200) { toast.error(`${techniciansResults.status} - ${techniciansResults.message}`) }
const getTechnicianData = async (dispatch) => {

    try {
        const technicianData = await fetch(`${urls.usersAPI}/technicians`);
        if (!technicianData.ok) { 
            return({status: technicianData.status, message: technicianData.statusText}) 
        }
        const technicianJSON = await technicianData.json();
        if (technicianJSON.status === 200) {
            await dispatch(technicianActions.loadTechnicianData (technicianJSON.technicians));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return technicianJSON;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}

// const contactsResults = await getContacts(selectedCustomer.id, dispatch);
// if (contactsResults.status !== 200) { toast.error(`${contactsResults.status} - ${contactsResults.message}`) }
const getContactsData = async (customerId, dispatch) => {

    try {
        const contactsData = await fetch(`${urls.contactAPI}/${customerId}`);
        if (!contactsData.ok) { 
            return({status: contactsData.status, message: contactsData.statusText}) 
        }
        const contactsJSON = await contactsData.json();

        if (contactsJSON.status === 200) {
            await dispatch(contactsActions.loadContactsData(contactsJSON.contacts));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return contactsJSON;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}

// const contactsResults = await getContacts(selectedCustomer.id, dispatch);
// if (contactsResults.status !== 200) { toast.error(`${contactsResults.status} - ${contactsResults.message}`) }
const getAllContactsData = async () => {

    try {
        const contactsData = await fetch(`${urls.contactAPI}`);
        if (!contactsData.ok) { 
            return({status: contactsData.status, message: contactsData.statusText}) 
        }
        const contactsJSON = await contactsData.json();

        if (contactsJSON.status === 200) {
            return ({ status: 200, message: "Successfully Fetched", contacts: contactsJSON })
        } else {
            return contactsJSON;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}


// Default snippet for this function
const getSelectedContactData = async(dispatch) => {
    try {
        const contactData = await fetch(url);
        if (!contactData.ok) { 
            return({status: contactData.status, message: contactData.statusText}) 
        }
        const contactJson = await contactJson.json();

        if (contactJson.status === 200) {
            await dispatch(contactsActions.loadContactsData(contactJson.contacts));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return contactJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }
}

// const selectedTicketResults = await getSelectedTicketData(selectedTicket.id, dispatch);
// if (selectedTicketResults.status !== 200) { toast.error(`${selectedTicketResults.status} - ${selectedTicketResults.message}`) }
const getSelectedTicketData = async (id, dispatch) => {
    try {
        const selectedTicketData = await fetch(`${urls.ticketAPI}/${id}`);
        if (!selectedTicketData.ok) { 
            return({status: selectedTicketData.status, message: selectedTicketData.statusText}) 
        }
        const selectedTicketJson = await selectedTicketData.json();
        if (selectedTicketJson.status === 200) {
            await dispatch(selectedTicketActions.loadTicketData(selectedTicketJson.ticket));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return selectedTicketJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }
}

//================================================================
// END Send in the url and the dispatcher for all these functions




// simple reformat of the minutes and seconds
const formatRemainingSeconds = (seconds) => {
    return (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds
}

const fancyFormat = (duration) => {
    // Hours, minutes and seconds (from stack overflow)
    const hrs = ~~(duration / 3600); // shorthand for Math.floor()
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}


export { formatRemainingSeconds, 
    fancyFormat, 
    getCustomerTableData, 
    getSelectedCustomerData, 
    getContactsData, 
    getTechnicianData, 
    getSelectedTicketData,
    getTicketTasksData,
    getTicketQueueTableData,
    getAllContactsData
}