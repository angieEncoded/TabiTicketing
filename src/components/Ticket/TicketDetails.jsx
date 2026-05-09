import React from 'react'
import { useSelector } from 'react-redux'

const TicketDetails = () => {

    const selectedTicket = useSelector(state => state.sticket.ticket)

    return (

        <div className="container">
            
              <h4 className="text-center baskerville-font mb-3">{selectedTicket.title}</h4>
            <hr />

            <h5 className="text-center baskerville-font mb-3">Ticket Details</h5>

            <div className="row mb-2">

                <div className="col-4 mb-3">Title </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.title}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>

                <div className="col-4 mb-3">Agenda </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.agenda}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>

                <div className="col-4 mb-3">Status </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.status}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>


                <div className="col-4 mb-3">Priority </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.priority}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>

                <div className="col-4 mb-3">Customer Solution </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.customer_solution}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>

                <div className="col-4 mb-3">Technical Solution </div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.technical_solution}</div>
                </div>
                <div className="col-2 col-lg-4">
                    <i className="las la-edit icon-hover"></i>
                </div>

                <div className="col-4 mb-3">Opened on</div>
                <div className="col-6 col-lg-4">
                    <div>{new Date(selectedTicket.createdAt).toLocaleDateString('en-US')} at {new Date(selectedTicket.createdAt).toLocaleTimeString('en-US')}</div>
                </div>
                <div className="col-2 col-lg-4">
                   
                </div>
                <div className="col-4 mb-3">Last Touched on:</div>
                <div className="col-6 col-lg-4">
                    <div>{new Date(selectedTicket.updatedAt).toLocaleDateString('en-US')} at {new Date(selectedTicket.updatedAt).toLocaleTimeString('en-US')}</div>
                </div>
                <div className="col-2 col-lg-4">
                  
                </div>
                <div className="col-4 mb-3">Total ticket time:</div>
                <div className="col-6 col-lg-4">
                    <div>{selectedTicket.ticket_time} minutes</div>
                </div>


            </div>
        </div>
    )



}



<></>
export default TicketDetails