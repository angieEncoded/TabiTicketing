import CustomerForm from "../components/Forms/CustomerForm"
import CustomerFormWIP from "../components/Forms/CustomerFormWIP"
import React from 'react'

const AddCustomerPage = () => {
    return (
        <CustomerFormWIP customerData={{'id': undefined}} />
        // <CustomerForm customerData={{'id': undefined}} />
    )
}

export default AddCustomerPage
