import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customersActions } from '../../store/CustomerSlice'
import Loading from '../LoadingScreens/Loading'
import LargeModal from "../Modal/LargeModal.jsx"
import classes from "./customertable.module.css"

const CustomerTableWIP = () => {

    // Grab items from the slices
    const urls = useSelector(state => state.urls.urls);
    const customersForTable = useSelector(state => state.cust.customers);


    console.log(urls)
    console.log(customersForTable)
    
    
    // Initially populate the data
    useEffect(() => {
        const getTableData = async () => {
            try {
                setHasError(false);
                setErrorMessage("");
                setIsPending(true);
                const customerData = await fetch(`${urls.getCustomerData}`);
                if (!customerData.ok) throw new Error("Failed to fetch customer data. Please contact tabi.");
                const customerJson = await customerData.json();
                dispatch(customersActions.loadCustomerData(customerJson));
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
                setHasError(true);
                setErrorMessage(error.message);
                toast.error(error.message);
            }
        }
        getTableData();
    }, []);





    // place in slice





  return (
    <>
    
        {customersForTable.map((customer) => (<li key={customer.id}>{customer}</li>))}
    
    </>








  )
}

export default CustomerTableWIP