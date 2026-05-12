import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Buttontabi from "../Button/Buttontabi";
import { useState } from 'react';
import { toast } from 'react-toastify';
import urls from "../../util/apiPaths.json";
import { getSelectedTicketData } from "../../util/helperFunctions"

const OpenTicketTasks = () => {

  const selectedTicket = useSelector(state => state.sticket.ticket);
  const [isPending, setIsPending] = useState(false);
  
  const dispatch = useDispatch();

  const closeTask = async (taskId) => {

        try {
            const results = await fetch(`${urls.ticketAPI}/endTicketTask/${taskId}`, {
                method: "PUT",
            })

            // if server cannot respond
            if (!results.ok) {
                // !!! TODO - logging here
                setIsPending(false);
                toast.error(`${results.status}:${results.statusText}`);
                return;
            }

            const serverResponse = await results.json();

            // The server may respond with a validation error, capture that here with feedback for the user
            if (serverResponse.error && serverResponse.error.length > 1) {
                // !!! TODO - logging here
                setIsPending(false);
                toast.error(`Server responded with: ${serverResponse.error}`);
                return;
            }

            if (serverResponse.status == "200") {
                toast.success(`Closed the task`);

                // Refresh the ticket we are looking at
                const selectedTicketResults = await getSelectedTicketData(selectedTicket.id, dispatch);
                if (selectedTicketResults.status !== 200) { toast.error(`${selectedTicketResults.status} - ${selectedTicketResults.message}`) }

                setIsPending(false)
                return;
            } else {
                setIsPending(false);
                toast.error(`${serverResponse.status} ${serverResponse.message}`);
                return;
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
            toast.error(`${error.message} - is the server down?`)
        }
  }




  return (
    <>


      {selectedTicket.ticket_times && selectedTicket.ticket_times.length > 0 &&
        <>
        <h5  className="text-center noticaText">Currently Active Tasks:</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Technician</th>
                <th scope="col">Task</th>
                <th scope="col">Started Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedTicket.ticket_times.map(task => (

                <tr key={task.id}>
                  <td>{task.user.first_name} {task.user.last_name}</td>
                  <td>{task.task_name}</td>
                  <td>{new Date(task.start_time).toLocaleTimeString('en-US')}</td>
                  <td><Buttontabi buttonClass={'logo btn-sm'}
                    title={!isPending ? "Close task" : "Submitting..."}
                    onClick={() => closeTask(task.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>

        </>
      }



    </>

  )
}

export default OpenTicketTasks