import React from 'react'
import { useSelector } from 'react-redux'

const TicketContactInfo = () => {

    const selectedTicket = useSelector(state => state.sticket.ticket);
    console.log(selectedTicket)
  return (


    <>
    <div className="row">
        <div className="col"><strong>Contact:</strong></div>
        <div className="col"><strong>Work Phone:</strong></div>
        <div className="col"><strong>Cell Phone:</strong></div>
        <div className="col"><strong>Email:</strong></div>
    </div>
        <div className="row">
        <div className="col">{selectedTicket?.contact?.first_name} {selectedTicket?.contact?.last_name}</div>
        <div className="col">{selectedTicket?.contact?.work_phone}</div>
        <div className="col">{selectedTicket?.contact?.cell_phone}</div>
        <div className="col">{selectedTicket?.contact?.email}</div>
    </div>


    <hr />
    </>
  )
}

export default TicketContactInfo