import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react';


const TicketDetails = () => {


const [clipboard, setClipboard] = useState(false);
const selectedTicket = useSelector(state => state.sticket.ticket)

   
// handle these two timers with a reference
const clipTimer = useRef(null);

const copyToClipboard = (type, value) => {

    if (value === "") {
        toast.warning("Nothing to copy");
        return;
    }

    if (type === "Email") { setClipboard("Email") }
    if (type === "Phone") { setClipboard("Phone") }
    if (type === "Phone2") { setClipboard("Phone2") }
    if (type === "Website") { setClipboard("Website") }

    clipTimer.current = setTimeout(() => {
        setClipboard(false);
    }, 3000);
    toast.success("Copied!");
    navigator.clipboard.writeText(value);

    return;
}



  return (


    <>

                    <hr />

                    <h5 className="text-center baskerville-font mb-3">Ticket Details</h5>

                    <div className="row">
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Title </div>
                                <div className="col-6 col-lg-4">
                                    <div>{selectedTicket.title}</div>
                                </div>
                                <div className="col-2 col-lg-4">
                                    <i className="las la-edit icon-hover"></i>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Agenda
                                    {clipboard && clipboard === 'Phone' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone", selectedTicket.primary_phone)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedTicket.primary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Secondary Phone:
                                    {clipboard && clipboard === 'Phone2' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone2", selectedTicket.secondary_phone)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedTicket.secondary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Fax:</div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedTicket.fax}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Website:
                                    {clipboard && clipboard === 'Website' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Website", selectedTicket.website)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedTicket.website}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Email:
                                    {clipboard && clipboard === 'Email' ? <span className="text-success"> <i className="las la-check mx-2"></i>  </span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Email", selectedTicket.email)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedTicket.email}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>


                        </div>
                    </div>

    </>
    
  )



}



<></>
export default TicketDetails