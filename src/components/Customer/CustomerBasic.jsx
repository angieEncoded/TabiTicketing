import React, { useEffect, useState } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"


const CustomerBasic = ({ id }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [selectedCustomerData, setSelectedCustomerData] = useState({});

    const urls = useSelector(state => state.urls.urls);

    const editField = (fieldData) => {
        console.log('clicked')
    }


    // Initially populate the data
    useEffect(() => {
        const getCustomerData = async () => {
            try {
                setIsPending(true);
                const customerData = await fetch(`${urls.getCustomerData}/${id}`);
                if (!customerData.ok) throw new Error("Failed to fetch data. Please check the server.");
                const customerJson = await customerData.json();
                setSelectedCustomerData(customerJson);
            } catch (error) {
                setIsPending(false);
                setHasError(true);
                setErrorMessage(error.message);
                toast.error(error.message);
            }
        }
        getCustomerData();
        setIsPending(false);
    }, []);




    return (
        <>
            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&
                <>
                    <hr />
                    <div className="row mb-2">
                        <div className="col-4">Notes:</div>
                        <div className="col-8 col-lg-4">
                            <div>{selectedCustomerData.notes}</div>
                            <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                        </div>
                    </div>
                    <hr />

                    <h5 className="text-center baskerville-font mb-3">Basic Information</h5>

                    <div className="row">
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Customer Name: </div>
                                <div className="col-6 col-lg-4">
                                    <div>{selectedCustomerData.customer_name}</div>
                                </div>
                                <div className="col-2 col-lg-4">
                                    <i className="las la-edit icon-hover"></i>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Primary Phone: </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomerData.primary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Secondary Phone: </div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomerData.secondary_phone}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Fax:</div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomerData.fax}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Website:</div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomerData.website}</div>
                                </div>
                                <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 d-none d-lg-block">Email:</div>
                                <div className="col-8 col-lg-4">
                                    <div>{selectedCustomerData.email}</div>
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