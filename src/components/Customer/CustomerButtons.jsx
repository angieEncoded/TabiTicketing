import React, { useState } from 'react'
import NewTicket from '../Ticket/NewTicket';

const CustomerButtons = ({addTicket, addEquipment, addLicense, addContact, addAddress, viewTickets, recordType, id}) => {


  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty"); 

  const handleButton = (type) => {
    if(type === 'Ticket'){
      setCurrentComponent('Ticket');
    }
  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }


  return (
    <div className="container">
        <div className="ms-start d-grid gap-2 d-md-block">
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={() => handleButton('Ticket')}>Add Ticket</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addEquipment}>Add Equipment</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addLicense}>Add License</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addContact}>Add Contact</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addAddress}>Add Address</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={viewTickets}>View all Tickets</button>
        </div>

      {currentComponent === 'Empty' && <></>}
      {currentComponent === 'Ticket' && <NewTicket customerId={id} technicianId={1} closeComponent={closeComponent}></NewTicket>}


    </div>
  )
}

export default CustomerButtons