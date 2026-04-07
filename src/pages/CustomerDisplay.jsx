import React from 'react'
import { default as CustomerDisplayComponent } from '../components/Customer/CustomerDisplay'
import CustomerButtons from '../components/Customer/CustomerButtons'

const CustomerDisplay = ({ recordType, id, recordName }) => {


  return (
  
    <>
 
    <CustomerDisplayComponent recordName={recordName} recordType={recordType} id={id}></CustomerDisplayComponent>
    

    </>
  )
}

export default CustomerDisplay