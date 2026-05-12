import React from 'react'
import { getTicketTasksData } from "../../util/helperFunctions"
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../LoadingScreens/Loading.jsx'
import { useState, useEffect } from 'react';
import LargeModal from "../Modal/LargeModal.jsx"
import TicketDisplay from './TicketDisplay.jsx'


const OpenTasksTable = () => {

  // const ticketTaskResults = await getTicketTasksData(dispatch);
  // if (ticketTaskResults.status !== 200) { toast.error(`${ticketTaskResults.status} - ${ticketTaskResults.message}`) }
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(false);
  const [ticketTitle, setTicketTitle] = useState(false);

  // Grab items from the slices
  const ticketTasks = useSelector(state => state.ttasks.ticket_tasks);
  const dispatch = useDispatch();

  const closeModal = () => {
      // dispatch(selectedCustomerActions.clearCustomerData()); // clear the data
      setShowModal(false); // close the modal
  }

  // Initially populate the data
  useEffect(() => {
    // Wrap in an async
    const getData = async () => {
      try {
        setIsPending(true)
        const results = await getTicketTasksData(dispatch); // reach out to the helper function
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

  const handleOpenTicket = async (row) => {
    setSelectedTicket(row.ticket.id);
    setTicketTitle(row.ticket.customer.customer_name);
    setShowModal(true);
  }




  return (
    <>
      {isPending && <Loading />}
      {!isPending && hasError && <ErrorAlert error={errorMessage} />}
      {!isPending && !hasError &&

        <>
    
        <h5 className="text-center baskerville-font mb-3">Click a row to view the associated ticket</h5>
      
        <LargeModal hideFormModal={closeModal} showFormModal={showModal} title={ticketTitle}>
          <TicketDisplay id={selectedTicket} closeTab={closeModal}/>
        </LargeModal>
      
      
      
        <table className="table table-striped table-hover tabi-hover">
            <thead>

              <tr>
                <th>Technician</th>
                <th>Customer Name</th>
                <th>Contact Name</th>
                <th>Task Name</th>
                <th>Start Time</th>
                <th>Ticket Title</th>
                <th>Ticket#</th>
              </tr>
            </thead>

            <tbody>
              {ticketTasks?.map(ticketTask =>
                <tr key={ticketTask?.id} onClick={() => handleOpenTicket(ticketTask)}>
                  <td>{ticketTask?.user?.first_name} {ticketTask?.user?.last_name}</td>
                  <td>{ticketTask?.ticket?.customer?.customer_name}</td>
                  <td>{ticketTask?.ticket?.contact?.first_name} {ticketTask?.ticket?.contact?.last_name}</td>
                  <td>{ticketTask?.task_name}</td>
                  <td>{new Date(ticketTask?.start_time).toLocaleTimeString('en-US')}</td>
                  <td>{ticketTask?.ticket?.title}</td>
                  <td>{ticketTask?.ticket?.id}</td>
                </tr>
              )}
            </tbody>



          </table>



        </>}


    </>

  )
}


export default OpenTasksTable