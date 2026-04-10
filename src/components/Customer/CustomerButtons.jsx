import React, { useState } from 'react'
import AddressForm from '../Forms/AddressForm';
import EquipmentForm from '../Forms/EquipmentForm';
import { useSelector, useDispatch } from 'react-redux'


const CustomerButtons = ({ recordType, id, recordName }) => {


  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty"); 

 
  const handleButton = (type) => {
    if(type === 'Address'){ setCurrentComponent('Address') }
    if(type === 'Equipment'){ setCurrentComponent('Equipment') }
   
  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }


  return (
    <div className="container">
        <div className="ms-start d-grid gap-2 d-md-block mb-3">
            <button className="btn btn-sm btn-tabi-logo mx-1" >Add Ticket</button>
            <button className="btn btn-sm btn-tabi-logo mx-1"  onClick={() => handleButton('Equipment')}  disabled={currentComponent === 'Equipment'}>Add Equipment</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" >Add License</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" >Add Contact</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={() => handleButton('Address')}  disabled={currentComponent === 'Address'}>Add Address</button>
            <button className="btn btn-sm btn-tabi-logo mx-1">View all Tickets</button>
        </div>


        {currentComponent === 'Empty' && <></>}
        {currentComponent === 'Address' && <AddressForm recordName={recordName} recordType={recordType} id={id} technicianId={1} closeComponent={closeComponent}></AddressForm>}
        {currentComponent === 'Equipment' && <EquipmentForm recordName={recordName} recordType={recordType} id={id} technicianId={1} closeComponent={closeComponent}></EquipmentForm>}
    


    </div>
  )
}

export default CustomerButtons