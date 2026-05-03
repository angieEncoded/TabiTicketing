import React, { useState } from 'react'
import AddressForm from '../Forms/AddressForm';
import EquipmentForm from '../Forms/EquipmentForm';
import ContactForm from '../Forms/ContactForm';
import LicenseForm from '../Forms/LicenseForm';
import PictureForm from '../Forms/PictureForm';
import TicketForm from '../Forms/TicketForm';

import { useSelector, useDispatch } from 'react-redux'


const CustomerButtons = ({ recordType }) => {


  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty");


  const handleButton = (type) => {
    if (type === 'Address') { setCurrentComponent('Address') }
    if (type === 'Equipment') { setCurrentComponent('Equipment') }
    if (type === 'Contact') { setCurrentComponent('Contact') }
    if (type === 'License') { setCurrentComponent('License') }
    if (type === 'Picture') { setCurrentComponent('Picture') }
    if (type === 'Ticket') { setCurrentComponent('Ticket') }

  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }


  return (
    <div className="container">

      <div className="ms-start d-grid gap-2 d-md-block mb-3">
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Address')} disabled={currentComponent === 'Address'}>Add Address</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Contact')} disabled={currentComponent === 'Contact'}>Add Contact</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Equipment')} disabled={currentComponent === 'Equipment'}>Add Equipment</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('License')} disabled={currentComponent === 'License'} >Add License</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Picture')} disabled={currentComponent === 'Picture'}>Add Picture</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Ticket')} disabled={currentComponent === 'Ticket'} >Add Ticket</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" >Add Project</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3">View all Tickets</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3">View all Projects</button>
      </div>


      {currentComponent === 'Empty' && <></>}
      {currentComponent === 'Address' && <AddressForm recordType={recordType} closeComponent={closeComponent}></AddressForm>}
      {currentComponent === 'Equipment' && <EquipmentForm recordType={recordType} closeComponent={closeComponent}></EquipmentForm>}
      {currentComponent === 'Contact' && <ContactForm recordType={recordType} closeComponent={closeComponent}></ContactForm>}
      {currentComponent === 'License' && <LicenseForm recordType={recordType} closeComponent={closeComponent}></LicenseForm>}
      {currentComponent === 'Picture' && <PictureForm recordType={recordType} closeComponent={closeComponent}></PictureForm>}
      {currentComponent === 'Ticket' && <TicketForm recordType={recordType} closeComponent={closeComponent}></TicketForm>}




    </div>
  )
}

export default CustomerButtons