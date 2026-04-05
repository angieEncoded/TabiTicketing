import React from 'react'
import { default as CustomerDisplayComponent } from '../components/Customer/CustomerDisplay'
import CustomerButtons from '../components/Customer/CustomerButtons'

const CustomerDisplay = ({id}) => {


  return (
  
    <>
 
    <CustomerDisplayComponent id={id}></CustomerDisplayComponent>
    

    </>
  )
}

export default CustomerDisplay