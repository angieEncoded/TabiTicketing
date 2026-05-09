import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedTicketData } from "../../util/helperFunctions.js";
import TicketDetails from './TicketDetails.jsx'

const TicketDisplay = ({ id }) => {

    // hard code for now
    id = 5;

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
  
    // Initially populate the data
    useEffect(() => {
        // Wrap in an async
        const getData = async () => {
            try {
                setIsPending(true)
                const results = await getSelectedTicketData(urls, id, dispatch); // reach out to the helper function
                console.log(results)
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
                   <TicketDetails />
                </>
            }
        </>
    )
}

export default TicketDisplay