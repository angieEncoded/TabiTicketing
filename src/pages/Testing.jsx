import { useEffect } from "react"
import { useSelector,useDispatch } from 'react-redux'
import { selectedCustomerActions } from "../store/SelectedCustomerSlice.js";
import { getSelectedCustomerData, getTechnicianData, getContactsData} from "../util/helperFunctions.js"
import { useState } from "react"
import TicketDisplay from "../components/Ticket/TicketDisplay.jsx"
import { toast } from 'react-toastify'

const closeComponent = () => {
    // console.log('yay')
}

const Testing = () => {

    // const [isPending, setIsPending] = useState(true)
    // const urls = useSelector(state => state.urls.urls);
    // const selectedCustomer = useSelector(state => state.scust.customer);
    // const customerContacts = useSelector(state => state.scust.customer.contacts);
    // const technicians = useSelector(state => state.technicians.technicians);
    // const customerProjects = useSelector(state => state.projects.projects);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const populateACustomer = async() => {
    //         const selectedCustomerData = await getSelectedCustomerData(`${urls.customerAPI}/1`, dispatch);
    //         if (!selectedCustomerData.status !== 200) {toast.error(`${selectedCustomerData.status} - ${selectedCustomerData.message}`)}
    //     }

    //     const getTechnicians = async () => {
    //         const techniciansResults = await getTechnicianData(`${urls.usersAPI}/technicians`, dispatch)
    //         if (techniciansResults.status !== 200) {toast.error(`${techniciansResults.status} - ${techniciansResults.message}`)}
    //     }

    //     populateACustomer()
    //     getTechnicians();
    //     setIsPending(false);
    // }, [])
    



    

    return (
       <>

        <TicketDisplay />
       </>
          
    )
}



export default Testing