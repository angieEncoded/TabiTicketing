import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import urls from "../../util/apiPaths.json";
import { toast } from 'react-toastify';
import Buttontabi from '../Button/Buttontabi';
import { useForm } from "react-hook-form"
import regexPatterns from '../../util/regexPatterns';
import { getSelectedTicketData, getSelectedCustomerData } from "../../util/helperFunctions";

const TicketDetails = () => {

    const selectedTicket = useSelector(state => state.sticket.ticket);
    const selectedCustomer = useSelector(state => state.scust.customer);
    const [isPending, setIsPending] = useState(false);
    const [editingField, setEditingField] = useState("empty");

    const dispatch = useDispatch();

    // registration for the react form
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState,
        setError,
        formState: { errors, isValid, dirtyFields, isSubmitSuccessful },
    } = useForm({
        mode: 'onChange',
    })



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

        // Guardrails before even asking the server, check on the server as well
        if (formData.status && formData.status === "CLOSED") {
            if (selectedTicket.customer_solution === '') {
                setIsPending(false)
                swapToNormalField();
                reset();
                toast.error("Please ensure that the Customer Friendly Solution field is filled out before closing the ticket.")
                return;
            }
        }



        try {
            const results = await fetch(`${urls.ticketAPI}/${selectedTicket.id}`, {
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
                toast.success(`Successfully updated the ticket.`);

                // Refresh the ticket
                const selectedTicketResults = await getSelectedTicketData(selectedTicket.id, dispatch);
                if (selectedTicketResults.status !== 200) { toast.error(`${selectedTicketResults.status} - ${selectedTicketResults.message}`) }

                // refresh the background customer
                const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }


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

        <div className="container">

            <h5 className="text-center baskerville-font mb-3">Ticket Details</h5>

            <div className="row mb-3">
                <div className={"col-2"}><strong>Task time for ticket:</strong></div>
                <div className={"col-9"}>{Math.floor(selectedTicket.ticket_time / 60)} Hours {selectedTicket.ticket_time % 60} Minutes</div>
            </div>

            <div className="row mb-2">
                {/* ================= COLUMN 1 =================== */}
                <div className="col-12 col-lg-6">

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Opened:</strong> </div>
                        <div className={"col-10"}>{new Date(selectedTicket.createdAt).toLocaleDateString('en-US')} {new Date(selectedTicket.createdAt).toLocaleTimeString('en-US')}</div>
                    </div>







                    {editingField && editingField === "title" ?
                        <div className="row mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* ================= TICKET TITLE ====================== */}
                                <div className="mb-3 row align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Title:</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input {...register('title', {
                                            required: true,
                                            pattern: regexPatterns.alphaNumeric
                                        })}
                                            className={errors.title && dirtyFields.title ? 'form-control is-invalid' : 'form-control'}
                                            placeholder={"Title: (Required)"}
                                            defaultValue={selectedTicket.title} />
                                    </div>
                                </div>

                                <div className="float-end">
                                    <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                    <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                </div>
                            </form>
                        </div>
                        :
                        <div className="row mb-3">
                            <div className={"col-2"}><strong>Title:</strong></div>
                            <div className={"col-9"}>{selectedTicket.title}</div>
                            <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("title", selectedTicket.title)}></i></div>
                        </div>
                    }

















                    {editingField && editingField === "status" ?
                        <div className="row mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* ================= TICKET STATUS ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Ticket Status:<span className={'text-danger'}></span></label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <select   {...register('status', {
                                            required: true,
                                            pattern: regexPatterns.alphaNumeric
                                        })}
                                            defaultValue={selectedTicket.status}
                                            className={errors.status && dirtyFields.status ? 'form-select is-invalid' : 'form-select'}>
                                            <option value={"OPEN"}>Open</option>
                                            <option value={"INPROGRESS"}>In Progress</option>
                                            <option value={"WAITINGONCUST"}>Waiting on Customer</option>
                                            <option value={"CLOSED"}>Closed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="float-end">
                                    <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                    <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                </div>
                            </form>
                        </div>
                        :
                        <div className="row mb-3">
                            <div className={"col-2"}><strong>Status:</strong></div>
                            <div className={"col-9"}>

                                {selectedTicket.status === "OPEN" && "Open"}
                                {selectedTicket.status === "INPROGRESS" && "In Progress"}
                                {selectedTicket.status === "WAITINGONCUST" && "Waiting on Customer"}
                                {selectedTicket.status === "CLOSED" && "Closed"}


                            </div>
                            <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("status", selectedTicket.status)}></i></div>
                        </div>

                    }






                </div>

                {/* ================= COLUMN 2 =================== */}
                <div className="col-12 col-lg-6">

                    <div className="row mb-3">
                        <div className={"col-2"}><strong>Touched:</strong></div>
                        <div className={"col-10"}>{new Date(selectedTicket.updatedAt).toLocaleDateString('en-US')} {new Date(selectedTicket.updatedAt).toLocaleTimeString('en-US')}</div>
                    </div>










                    {editingField && editingField === "priority" ?
                        <div className="row mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* ================= TICKET PRIORITY ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Ticket Priority:<span className={'text-danger'}></span></label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <select   {...register('priority', {
                                            required: true,
                                            pattern: regexPatterns.alphaNumeric
                                        })}
                                            defaultValue={selectedTicket.priority}
                                            className={errors.priority && dirtyFields.priority ? 'form-select is-invalid' : 'form-select'}>
                                            <option value={"LOW"}>Low</option>
                                            <option value={"NORMAL"}>Normal</option>
                                            <option value={"HIGH"}>High</option>
                                            <option value={"CRITICAL"}>Critical</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="float-end">
                                    <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                    <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                </div>
                            </form>
                        </div>
                        :
                        <div className="row mb-3">
                            <div className={"col-2"}><strong>Priority:</strong></div>
                            <div className={"col-9"}>{selectedTicket.priority}</div>
                            <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("priority", selectedTicket.priority)}></i></div>
                        </div>


                    }


                    {editingField && editingField === "ticket_type" ?
                        <div className="row mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* ================= TICKET TYPE ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Ticket Type:<span className={'text-danger'}></span></label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <select   {...register('ticket_type', {
                                            required: true,
                                            pattern: regexPatterns.alphaNumeric
                                        })}
                                            defaultValue='OPEN'
                                            className={errors.ticket_type && dirtyFields.ticket_type ? 'form-select is-invalid' : 'form-select'}>
                                            <option value={"REMOTE"}>Remote</option>
                                            <option value={"BUILD"}>Build</option>
                                            <option value={"ONSITE"}>On Site</option>
                                            <option value={"HYBRID"}>Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="float-end">
                                    <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                    <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                </div>
                            </form>
                        </div>
                        :

                        <div className="row mb-3">
                            <div className={"col-2"}><strong>Type:</strong></div>
                            <div className={"col-9"}>{selectedTicket.ticket_type}</div>
                            <div className={"col-1"}><i className="las la-edit icon-hover" onClick={() => swapToEditField("ticket_type", selectedTicket.ticket_type)}></i></div>
                        </div>

                    }










                </div>
            </div>

            <hr />



            {editingField && editingField === "agenda" ?
                <div className="row mb-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* ================= TICKET AGENDA ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Agenda:</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <textarea {...register('agenda', {
                                    required: false,
                                    pattern: regexPatterns.alphaNumeric
                                })}
                                    className={errors.agenda && dirtyFields.agenda ? 'form-control is-invalid' : 'form-control'}
                                    placeholder={"What needs to be done?"}
                                    defaultValue={selectedTicket.agenda}></textarea>
                            </div>
                        </div>


                        <div className="float-end">
                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                        </div>
                    </form>
                </div>
                :
                <div className="row mb-3">
                    <div className={"col-2"}><strong>Agenda:</strong></div>
                    <div className={"col-9"}>{selectedTicket.agenda}</div>
                    <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("agenda", selectedTicket.agenda)}></i></div>
                </div>

            }



            {editingField && editingField === "customer_solution" ?
                <div className="row mb-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* ================= CUSTOMER FRIENDLY SOLUTION ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Customer Friendly Solution:</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <textarea {...register('customer_solution', {
                                    required: false,
                                    pattern: regexPatterns.alphaNumeric
                                })}
                                    className={errors.customer_solution && dirtyFields.customer_solution ? 'form-control is-invalid' : 'form-control'}
                                    placeholder={"Customer Friendly Solution"}
                                    defaultValue={selectedTicket.customer_solution}></textarea>
                            </div>
                        </div>

                        <div className="float-end">
                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                        </div>
                    </form>
                </div>
                :

                <div className="row mb-3">
                    <div className={"col-2"}><strong>Customer Solution:</strong></div>
                    <div className={"col-9"}>{selectedTicket.customer_solution}</div>
                    <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("customer_solution", selectedTicket.customer_solution)}></i></div>
                </div>


            }




            {editingField && editingField === "technical_solution" ?
                <div className="row mb-3">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* ================= TECHNICAL DETAILS ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Technical Details:</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <textarea {...register('technical_details', {
                                    required: false,
                                    pattern: regexPatterns.alphaNumeric
                                })}
                                    className={errors.technical_details && dirtyFields.technical_details ? 'form-control is-invalid' : 'form-control'}
                                    defaultValue={selectedTicket.technical_details}
                                ></textarea>
                            </div>
                        </div>

                        <div className="float-end">
                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                        </div>
                    </form>
                </div>
                :
                <div className="row mb-3">
                    <div className={"col-2"}><strong>Technical Details:</strong></div>
                    <div className={"col-9"}>{selectedTicket.technical_details}</div>
                    <div className={"col-1"}><i className="las la-edit icon-hover float-end" onClick={() => swapToEditField("technical_solution", selectedTicket.technical_details)}></i></div>
                </div>

            }




        </div>

    )



}



<></>
export default TicketDetails