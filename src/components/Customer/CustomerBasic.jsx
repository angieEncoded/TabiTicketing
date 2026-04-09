import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"


const CustomerBasic = ({ id }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});
    const [clipboard, setClipboard] = useState(false);
    

    const urls = useSelector(state => state.urls.urls);
    const selectedCustomer = useSelector(state => state.scust.customer)

    // handle these two timers with a reference
    const clipTimer = useRef(null);


    const editField = (fieldData) => {
        console.log('clicked')
    }


    // Clean up any residuals on the clipboard
    useEffect(() => {

        // unmount callback to clean up some timer stuff
        return () => {
            if (clipTimer.current != null) {
                window.clearTimeout(clipTimer)
            }
        }
    }, [])


    const copyToClipboard = (type, value) => {

        if (value === "") {
            toast.warning("Nothing to copy");
            return;
        }

        if (type === "Email"){setClipboard("Email")}
        if (type === "Phone"){setClipboard("Phone")}
        if (type === "Phone2"){setClipboard("Phone2")}
        if (type === "Website"){setClipboard("Website")}

        clipTimer.current = setTimeout(() => {
            setClipboard(false);
        }, 3000);
        toast.success("Copied!");
        navigator.clipboard.writeText(value);
        
        return;
    }






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
                            <div>{selectedCustomer.notes}</div>
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
                                    <div>{selectedCustomer.customer_name}</div>
                                </div>
                                <div className="col-2 col-lg-4">
                                    <i className="las la-edit icon-hover"></i>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Primary Phone: 
                                    {clipboard && clipboard === 'Phone' ?<span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone", selectedCustomerData.primary_phone)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomer.primary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Secondary Phone: 
                                    {clipboard && clipboard === 'Phone2' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone2", selectedCustomerData.secondary_phone)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomer.secondary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Fax:</div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomer.fax}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Website:
                                    {clipboard && clipboard === 'Website' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Website", selectedCustomerData.website)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomer.website}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Email: 
                                    {clipboard && clipboard === 'Email' ? <span className="text-success"> <i className="las la-check mx-2"></i>  </span>: <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Email", selectedCustomerData.email)}></i></span>}
                                </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomer.email}</div>
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

export default CustomerBasic