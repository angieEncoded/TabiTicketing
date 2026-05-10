import React from 'react'
import { useSelector } from 'react-redux'

//LEFT OFF AT WORKING ON THESE QUICK EDIT FIELDS


const TicketDetails = () => {

    const selectedTicket = useSelector(state => state.sticket.ticket)

    const swapToEditField = (field, item) => {
        // if we are trying to edit the ticket to be closed check that the customer solution field is filled out
        // (also checking on back end)
        console.log(field)
        console.log(item)
    }


    const handleChangeField = () => {

    }



    return (

        <div className="container">

            <h5 className="text-center baskerville-font mb-3">Ticket Details</h5>

            <div className="row mb-3">
                <div className={"col-2"}><strong>Task time for ticket:</strong></div>
                <div className={"col-9"}>{Math.floor(selectedTicket.ticket_time / 60)} Hours {selectedTicket.ticket_time % 60} Minutes</div>
            </div>

            <div className="row mb-2">
                {/* ================= COLUMN 1 =================== */}
                <div className="col-12 col-lg-6">

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Opened:</strong> </div>
                        <div className={"col-10"}>{new Date(selectedTicket.createdAt).toLocaleDateString('en-US')} {new Date(selectedTicket.createdAt).toLocaleTimeString('en-US')}</div>
                    </div>

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Title:</strong></div>
                        <div className={"col-9"}>{selectedTicket.title}</div>
                        <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("title", selectedTicket.title)}></i></div>
                    </div>

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Status:</strong></div>
                        <div className={"col-9"}>{selectedTicket.status}</div>
                        <div className={"col-1"}><i className="las la-edit icon-hover"onClick={() => swapToEditField("status", selectedTicket.status)}></i></div>
                    </div>

                </div>

                {/* ================= COLUMN 2 =================== */}
                <div className="col-12 col-lg-6">

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Touched:</strong></div>
                        <div className={"col-10"}>{new Date(selectedTicket.updatedAt).toLocaleDateString('en-US')} {new Date(selectedTicket.updatedAt).toLocaleTimeString('en-US')}</div>
                    </div>


                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Priority:</strong></div>
                        <div className={"col-9"}>{selectedTicket.priority}</div>
                        <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("priority", selectedTicket.priority)}></i></div>
                    </div>
                </div>
            </div>
            
            <hr />
            <div className="row mb-3">
                <div className={"col-2"}><strong>Agenda:</strong></div>
                <div className={"col-9"}>{selectedTicket.agenda}</div>
                <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("agenda", selectedTicket.agenda)}></i></div>
            </div>

            <div className="row mb-3">
                <div className={"col-2"}><strong>Customer Solution:</strong></div>
                <div className={"col-9"}>{selectedTicket.customer_solution}</div>
                <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("customer_solution", selectedTicket.customer_solution)}></i></div>
            </div>


            <div className="row mb-3">
                <div className={"col-2"}><strong>Technical Solution:</strong></div>
                <div className={"col-9"}>{selectedTicket.technical_solution}</div>
                <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("technical_solution", selectedTicket.technical_details)}></i></div>
            </div>



        </div>

    )



}



<></>
export default TicketDetails