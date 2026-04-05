import React from 'react'

const CustomerButtons = ({addTicket, addEquipment, addLicense, addContact, addAddress, viewTickets, recordType, id}) => {

  return (
    <div className="container">
        <div className="ms-start d-grid gap-2 d-md-block">
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addTicket}>Add Ticket</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addEquipment}>Add Equipment</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addLicense}>Add License</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addContact}>Add Contact</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={addAddress}>Add Address</button>
            <button className="btn btn-sm btn-tabi-logo mx-1" onClick={viewTickets}>View all Tickets</button>
        </div>
    </div>
  )
}

export default CustomerButtons