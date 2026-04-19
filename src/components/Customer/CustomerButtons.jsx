import React, { useState } from 'react'
import AddressForm from '../Forms/AddressForm';
import EquipmentForm from '../Forms/EquipmentForm';
import ContactForm from '../Forms/ContactForm';
import { useSelector, useDispatch } from 'react-redux'


const CustomerButtons = ({ recordType }) => {


  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty"); 

 
  const handleButton = (type) => {
    if(type === 'Address'){ setCurrentComponent('Address') }
    if(type === 'Equipment'){ setCurrentComponent('Equipment') }
    if(type === 'Contact'){ setCurrentComponent('Contact') }
   
  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }


  return (
    <div className="container">
        <div className="ms-start d-grid gap-2 d-md-block mb-3">
            <button className="btn btn-sm btn-tabi-logo mx-1" >Add Ticket</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={() => handleButton('Equipment')}  disabled={currentComponent === 'Equipment'}>Add Equipment</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" >Add License</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={() => handleButton('Contact')}  disabled={currentComponent === 'Contact'}>Add Contact</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={() => handleButton('Address')}  disabled={currentComponent === 'Address'}>Add Address</button>
            <button className="btn btn-sm btn-tabi-logo mx-1">View all Tickets</button>
        </div>


        {currentComponent === 'Empty' && <></>}
        {currentComponent === 'Address' && <AddressForm  recordType={recordType} closeComponent={closeComponent}></AddressForm>}
        {currentComponent === 'Equipment' && <EquipmentForm recordType={recordType} closeComponent={closeComponent}></EquipmentForm>}
        {currentComponent === 'Contact' && <ContactForm recordType={recordType} closeComponent={closeComponent}></ContactForm>}
    


    </div>
  )
}

export default CustomerButtons