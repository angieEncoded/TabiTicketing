import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedTicketData } from "../../util/helperFunctions.js";


const TicketDisplay = ({ id }) => {

    // hard code for now
    id = 5;


    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
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


    // need the ticket ID and will query all the relevant data from there

    // Initially populate the data
    useEffect(() => {
        // Wrap in an async
        const getData = async () => {
            try {
                setIsPending(true)
                const results = await getSelectedTicketData(urls, id, dispatch); // reach out to the helper function
                if (results.status === 200) {
                    setIsPending(false);
                } else {
                    setIsPending(false);
                    toast.error(`${results.status} ${results.message}`)
                }
            } catch (error) {
                setIsPending(false);
                toast.error(error);
            }
        }
        getData();
    }, []);









    return (
        <>
            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&
                <>
                    <hr />
                    <div className="row mb-2">
                        <div className="col-2">Notes:</div>
                        <div className="col-8">
                            <div>{selectedTicket.notes}</div>
                        </div>
                        <div className="col-2 ">
                            <i className="las la-edit icon-hover"></i>
                        </div>
                    </div>
                    <hr />

                    <h5 className="text-center baskerville-font mb-3">Basic Information</h5>

                    <div className="row">
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Customer Name: </div>
                                <div className="col-6 col-lg-4">
                                    <div>{selectedTicket.customer_name}</div>
                                </div>
                                <div className="col-2 col-lg-4">
                                    <i className="las la-edit icon-hover"></i>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Primary Phone:
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
            }
        </>
    )
}

export default TicketDisplay