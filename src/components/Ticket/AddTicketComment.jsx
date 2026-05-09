import React from 'react';
import { useForm } from "react-hook-form";
import Buttontabi from "../Button/Buttontabi";
import { useState, useEffect } from 'react';
import regexPatterns from "../../util/regexPatterns";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import urls from "../../util/apiPaths.json";
import { getSelectedTicketData } from "../../util/helperFunctions"

const AddTicketComment = () => {


  const loggedInUser = 3;

  const [isPending, setIsPending] = useState(false);
  const selectedTicket = useSelector(state => state.sticket.ticket);

  const dispatch = useDispatch();


  // registration for the react form
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState,
    formState: { errors, isValid, dirtyFields, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
  })

  const cancelTask = () => {
    reset();
  }


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset])


  const onSubmit = async (formData) => {

    setIsPending(true); // invoke our spinner

    // !!!TODO - update with logged in user
    const formPost = {
      ...formData,
      added_by: 'SYSTEM',
      updated_by: 'SYSTEM',
      userId: loggedInUser
    }

    try {

      const results = await fetch(`${urls.ticketAPI}/comment/${selectedTicket.id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formPost)
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
        toast.success(`Successfully added your comment.`);

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
     <form onSubmit={handleSubmit(onSubmit)}>
      
            {/* ================= COMMENT ====================== */}
            <label className="form-label">Post Comment</label>
            <textarea {...register('comment', {
              required: true,
              pattern: regexPatterns.alphaNumeric,
            })}
              className={errors.comment && dirtyFields.comment ? 'form-control is-invalid mb-3' : 'form-control mb-3'}
              placeholder={"Comment text"}
              rows="5"
            >
            </textarea>
            <Buttontabi type='submit' buttonClass={'logo mb-3'} title={!isPending ? "Post Comment" : "Submitting..."} disabled={!isValid} />
          </form>
    </>
  )
}

export default AddTicketComment