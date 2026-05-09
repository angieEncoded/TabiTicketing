import React from 'react'
import { useSelector } from 'react-redux'
const TicketComments = () => {

    const selectedTicket = useSelector(state => state.sticket.ticket)

  return (

    <>
    
    <hr />
    <div>TicketComments</div>
    
    </>
  )
}

export default TicketComments