import AddressForm from "../components/Forms/AddressForm"
import EquipmentForm from "../components/Forms/EquipmentForm"
import LicenseForm from "../components/Forms/LicenseForm"
import LicenseDisplay from "../components/Customer/LicenseDisplay.jsx"
import { useEffect } from "react"
import { useSelector,useDispatch } from 'react-redux'
import { selectedCustomerActions } from "../store/SelectedCustomerSlice.js";

const closeComponent = () => {
    // console.log('yay')
}

const Testing = () => {

    const urls = useSelector(state => state.urls.urls);
    const dispatch = useDispatch();

    useEffect(() => {
    const populateACustomer = async() => {
        const selectedCustomerData = await fetch(`${urls.customerAPI}/1`);
        if (!selectedCustomerData.ok) throw new Error("Failed to fetch customer data. Please refresh the system.");
        const selectedCustomerJson = await selectedCustomerData.json();
        dispatch(selectedCustomerActions.loadCustomerData(selectedCustomerJson));
    }
    populateACustomer()
    }, [])
    
    

    

    return (
       <>
       
       {/* <AddressForm recordType={'customer'} id={1} closeComponent={closeComponent} /> */}
       {/* <EquipmentForm /> */}
       {/* <LicenseForm recordType={'customer'} closeComponent={closeComponent}></LicenseForm> */}
       <LicenseDisplay />
       </>
          
    )
}



export default Testing