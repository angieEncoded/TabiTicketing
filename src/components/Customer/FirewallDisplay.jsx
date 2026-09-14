import { useState } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { useSelector, useDispatch } from 'react-redux'
import urls from "../../util/apiPaths.json";
import { getSelectedCustomerData } from "../../util/helperFunctions.js";

const FirewallDisplay = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [editingField, setEditingField] = useState("empty");

    const selectedCustomer = useSelector(state => state.scust.customer);

    const dispatch = useDispatch();

    const swapToEditField = (field) => {
        setEditingField(field);
    }

    const swapToNormalField = () => {
        setEditingField("empty");
    }


    const onSubmit = async (formData) => {

        setIsPending(true); // invoke spinner


        const formPost = {
            ...formData,
            added_by: 'SYSTEM',
            updated_by: 'SYSTEM'
        }


        try {
            const results = await fetch(`${urls.addressAPI}/${selectedCustomer.address.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formPost)
            })

            // if server cannot respond
            if (!results.ok) {
                // !!! TODO - logging here
                setIsPending(false);
                setError("root.serverError", { type: "500" }) // prevent the form from clearing
                toast.error(`${results.status}:${results.statusText}`);
                return;
            }

            const serverResponse = await results.json();

            // Successful submit
            if (serverResponse.status == "200") {
                toast.success(`Successfully updated the customer.`);

                // refresh the background customer
                const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }

                // refresh the background table
                const customerTableResults = await getCustomerTableData(dispatch);
                if (customerTableResults.status !== 200) { toast.error(`${customerTableResults.status} - ${customerTableResults.message}`) }

                swapToNormalField();
                setIsPending(false)
                return;
            } else {
                setIsPending(false)
                setError("root.serverError", { type: serverResponse.status }) // prevent the form from clearing
                toast.error(`Error: ${serverResponse.status} ${serverResponse.message}`)
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
            setError("root.serverError", { type: "500" }) // prevent the form from clearing
            toast.error(`${error.message} - is the server down?`)
        }
    }



    return (
        <>

            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&
                <>
                    <hr></hr>
                    <h5 className="text-center baskerville-font mb-3">Firewalls\Routers</h5>
                    {selectedCustomer?.routers && selectedCustomer.routers?.length < 1 && <p className="text-center">No Firewalls recorded for this customer.</p>}

                    {selectedCustomer?.routers && selectedCustomer.routers?.length >= 1 &&
                        <>
                            {selectedCustomer.routers.map(router => (

                                <div key={router.id}>
                                    <p className={`ms-start baskerville-font mb-3 ${router.type == 'Billing' ? `text-success` : `text-tabi-logo`}  `}>{router.type}</p>
                                    <div className="row">
                                        <div className="col-12 col-xl-6">
                                            <div className="row mb-2">
                                                <div className="col-4 d-none d-lg-block"><strong>Street 1</strong></div>
                                                <div className="col-6 col-lg-4">
                                                    <div>{router.street1}</div>
                                                </div>
                                                <div className="col-2 col-lg-4">
                                                    <i className="las la-edit icon-hover"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            ))}
                        </>
                    }
                </>
            }


        </>

    )
}

export default FirewallDisplay