import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedTicketData } from "../../util/helperFunctions.js"
import TicketDetails from './TicketDetails.jsx'
import TicketTimes from './TicketTimes.jsx'
import TicketCommentsTable from './TicketCommentsTable.jsx'
import StartTicketTask from './StartTicketTask.jsx'
import OpenTicketTasks from './OpenTicketTasks.jsx'
import TicketHistory from './TicketHistory.jsx'
import AddTicketComment from "./AddTicketComment.jsx"
import Buttontabi from '../Button/Buttontabi.jsx'
import TicketContactInfo from './TicketContactInfo.jsx'

const TicketDisplay = ({ id, closeTab, calledFrom }) => {


    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(true); // remember to set these as true so it doesnt try to read immediately on mount, if it fails on the first item this is why its happening

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
                <span>

                    {calledFrom && calledFrom === "customer" && <span className={'float-end tabi-hover'}  onClick={() => closeTab()}>Close<i className="las la-window-close"></i></span>}
                    <h4 className="text-center baskerville-font mb-3">{selectedTicket.customer?.customer_name} - {selectedTicket.title}</h4>

                </span>

                    <hr />

                    <TicketContactInfo />
                    <OpenTicketTasks />
                    <TicketDetails />
                    <TicketCommentsTable />

                    <h5 className="text-center noticaText">Ticket Actions</h5>
                    <hr></hr>

                    <div className="row">

                        <div className="col-12 col-md-6">
                            <StartTicketTask />
                        </div>

                        <div className="col-12 col-md-6">
                            <AddTicketComment />
                        </div>
                    </div>

                    {/* <TicketTimes /> */}
                    {/* <TicketHistory /> */}

                </>
            }
        </>
    )
}

export default TicketDisplay