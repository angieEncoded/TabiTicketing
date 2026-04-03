import { useEffect, useMemo, useState } from 'react'
import { customersActions } from '../../store/CustomerSlice'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../LoadingScreens/Loading'
import LargeModal from "../Modal/LargeModal.jsx"
import classes from "./customertable.module.css"
import DataTable from 'datatables.net-react';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

  

const CustomerTableWIP = () => {


    const columns = [
        { data: 'customer_name' },
        { data: 'county' },
        { data: 'primary_phone' },
        { data: 'billing_address_one' },
        { data: 'billing_address_city' },
        { data: 'billing_address_state' },
    ];


    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Grab items from the slices
    const urls = useSelector(state => state.urls.urls);
    const customersForTable = useSelector(state => state.cust.customers);

    const dispatch = useDispatch();


    // console.log(urls.addNewCustomer)
    // customersForTable.map(cust => console.log(cust.id))
    
    
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

    <DataTable data={customersForTable} className="display">
        <thead>
            <tr>
                <th>Customer Name</th>
                <th>County</th>
                <th>Customer Phone</th>
                <th>Billing Address 1</th>
                <th>Billing Address 2</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
            </tr>
        </thead>
    </DataTable>
    
            {customersForTable.map((customer) => (<p key={customer.id}>{customer.customer_name} {customer.id}</p>))}
      
    </>








  )
}

export default CustomerTableWIP