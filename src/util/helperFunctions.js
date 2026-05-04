import { customersActions } from "../store/CustomerSlice";
import { contactsActions } from "../store/ContactSlice";
import { technicianActions } from "../store/TechnicianSlice";
import { ticketsActions } from "../store/TicketSlice";
import { selectedCustomerActions } from "../store/SelectedCustomerSlice";

// Import all the dispatcher actions

// Send in the url and the dispatcher for all these functions
//================================================================

// default react snippet for this function
/*
// Refresh the background table
const tableResults = await getTableData(`${urls.customerAPI}`, dispatch);
if (tableResults.status !== 200) { toast.error(`${tableResults.status} - ${tableResults.message}`) }
*/

const getTableData = async (url, dispatch) => {

    try {
        const customerData = await fetch(url);
        if (!customerData.ok) { 
            return({status: customerData.status, message: customerData.statusText}) 
        }
        const customerJson = await customerData.json();
        if (customerJson.status === 200) {
            dispatch(customersActions.loadCustomerData(customerJson.customers));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return customerJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }
}


// Default react snippet for this function
/*
const custResults = await getSelectedCustomerData(`${urls.customerAPI}/${selectedCustomer.id}`, dispatch);
if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
*/
const getSelectedCustomerData = async (url, dispatch) => {

    try {
        const selectedCustomerData = await fetch(url);
        if (!selectedCustomerData.ok) { 
            return({status: selectedCustomerData.status, message: selectedCustomerData.statusText}) 
        }
        const selectedCustomerJson = await selectedCustomerData.json();

        if (selectedCustomerJson.status === 200) {
            dispatch(selectedCustomerActions.loadCustomerData(selectedCustomerJson.customer));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return selectedCustomerJson;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}

/*
const techniciansResults = await getTechnicians(`${urls.techniciansAPI}/technicians`, dispatch);
if (techniciansResults.status !== 200) { toast.error(`${techniciansResults.status} - ${techniciansResults.message}`) }
*/
const getTechnicianData = async (url, dispatch) => {

    try {
        const technicianData = await fetch(url);
        if (!technicianData.ok) { 
            return({status: technicianData.status, message: technicianData.statusText}) 
        }
        const technicianJSON = await technicianData.json();

        if (technicianJSON.status === 200) {
            dispatch(technicianActions.loadTechnicianData (technicianJSON.technicians));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return technicianJSON;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}

















// Default react snippet for this function
/*
const contactsResults = await getContacts(`${urls.contactAPI}/${selectedCustomer.id}`, dispatch);
if (contactsResults.status !== 200) { toast.error(`${contactsResults.status} - ${contactsResults.message}`) }
*/
const getContactsData = async (url, dispatch) => {

    try {
        const contactsData = await fetch(url);
        if (!contactsData.ok) { 
            return({status: contactsData.status, message: contactsData.statusText}) 
        }
        const contactsJSON = await contactsData.json();
        console.log(contactsJSON)
        if (contactsJSON.status === 200) {
            dispatch(contactsActions.loadContactsData(contactsJSON.contacts));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return contactsJSON;
        }
    } catch (error) {
        return ({ status: error.status, message: error.message })
    }

}










// Default snippet for this function


const getSelectedContactData = async(url, dispatch) => {
    try {
        const contactData = await fetch(url);
        if (!contactData.ok) { 
            return({status: contactData.status, message: contactData.statusText}) 
        }
        const contactJson = await contactJson.json();

        if (contactJson.status === 200) {
            dispatch(contactsActions.loadContactsData(contactJson.contacts));
            return ({ status: 200, message: "Successfully Fetched" })
        } else {
            return contactJson;
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


export { formatRemainingSeconds, fancyFormat, getTableData, getSelectedCustomerData, getContactsData, getTechnicianData }