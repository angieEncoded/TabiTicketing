import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedTicketData } from "../../util/helperFunctions.js"
import TicketDetails from './TicketDetails.jsx'
import TicketTimes from './TicketTimes.jsx'
import TicketComments from './TicketComments.jsx'
import StartTicketTask from './StartTicketTask.jsx'
import OpenTicketTasks from './OpenTicketTasks.jsx'
import TicketHistory from './TicketHistory.jsx'

const TicketDisplay = ({ id }) => {

    // hard code for now
    id = 5;

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const selectedTicket = useSelector(state => state.sticket.ticket)
    const dispatch = useDispatch();

    // Initially populate the data
    useEffect(() => {
        // Wrap in an async
        const getData = async () => {
            try {
                setIsPending(true)
                const results = await getSelectedTicketData(id, dispatch); // reach out to the helper function
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
                    <StartTicketTask />
                    <OpenTicketTasks />
                    <TicketDetails />
                    {/* <TicketComments /> */}
                    {/* <TicketTimes /> */}
                    {/* <TicketHistory /> */}

                </>
            }
        </>
    )
}

export default TicketDisplay