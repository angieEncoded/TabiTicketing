import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import usStates from '../../util/usStates.json';
import countries from '../../util/countries.json';
import { useSelector, useDispatch } from 'react-redux'
import { customersActions } from '../../store/CustomerSlice.js'
import { selectedCustomerActions } from "../../store/SelectedCustomerSlice.js";
import { contactsActions } from "../../store/ContactSlice.js"
import { technicianActions } from "../../store/TechnicianSlice.js";
import { projectActions } from "../../store/ProjectSlice.js";
import { getTechnicianData, getSelectedCustomerData } from "../../util/helperFunctions.js";
import Loading from '../LoadingScreens/Loading.jsx'
import {tabActions} from "../../store/TabDisplaySlice.js";
import urls from "../../util/apiPaths.json";

const TicketForm = ({ recordType, closeComponent, openNewTab }) => {

    const loggedInUser = 4;

    const [isPending, setIsPending] = useState(true); // make sure component doesnt render before the use effect is done...

    const selectedCustomer = useSelector(state => state.scust.customer);
    const customerContacts = useSelector(state => state.scust.customer.contacts);
    const technicians = useSelector(state => state.technicians.technicians);
    const customerProjects = useSelector(state => state.projects.projects);
    const [savedTicketId, setSavedTicketId] = useState(false);

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

    useEffect(() => {

        const getTechnicians = async () => {
            const techniciansResults = await getTechnicianData(dispatch);
            if (techniciansResults.status !== 200) {toast.error(`${techniciansResults.status} - ${techniciansResults.message}`)}
            setIsPending(false)
        }

        // TODO - add projects
        // const getProjectsData = async () => {
        //     try {

        //         setIsPending(true);
        //         const projectsData = await fetch(`${urls.projectsAPI}`);
        //         if (!projectsData.ok) throw new Error("Failed to fetch project data. Projects may not be loaded.");
        //         const projectsJson = await projectsData.json();
        //         console.log(projectsJson);

        //         // Make sure to handle the errors
        //         if (projectsJson.status == 200) {
        //             dispatch(projectActions.loadProjectData(projectsJson));
        //             setIsPending(false);
        //         } else {
        //             throw new Error(projectsJson);
        //             setIsPending(false);
        //         }

        //     } catch (error) {
        //         setError("root.serverError", { type: error.status }) // prevent the form from clearing
        //         toast.error(`Error: ${error.status} ${error.message}`)
        //         setIsPending(false);
        //     }
        // }

        getTechnicians();
    }, []);


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            cancelTask();
             console.log(savedTicketId)
            openNewTab(savedTicketId);
        }
    }, [formState, reset])

    const onSubmit = async (formData) => {

        setIsPending(true); // invoke spinner

        const formPost = {
            ...formData,
            added_by: 'SYSTEM',
            updated_by: 'SYSTEM'
        }

        try {
            const results = await fetch(`${urls.ticketAPI}/${selectedCustomer.id}`, {
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
                setError("root.serverError", { type: "500" }) // prevent the form from clearing
                toast.error(`${results.status}:${results.statusText}`);
                return;
            }

            const serverResponse = await results.json();

            // Successful submit
            if (serverResponse.status == "200") {
                toast.success(`Successfully added a new ticket for ${selectedCustomer.customer_name}`);
                setSavedTicketId(serverResponse.ticket.id);

                // Refresh the selected customer
                if (recordType === 'customer') {
                    console.log("got in here")
                    const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                    if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
                }

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

    const cancelTask = () => {
        reset();
        closeComponent();
    }

    return (
        <>
            {isPending && <Loading />}
            {!isPending &&
                <div className="form-background mb-5 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* ================= TICKET TITLE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Title:</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('title', {
                                    required: true,
                                    pattern: regexPatterns.alphaNumeric
                                })}
                                    className={errors.title && dirtyFields.title ? 'form-control is-invalid' : 'form-control'}
                                    placeholder={"Title: (Required)"} />
                            </div>
                        </div>

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
                                    placeholder={"What needs to be done?"}></textarea>
                            </div>
                        </div>

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
                                    defaultValue='OPEN'
                                    className={errors.status && dirtyFields.status ? 'form-select is-invalid' : 'form-select'}>
                                    <option value={"OPEN"}>Open</option>
                                    <option value={"INPROGRESS"}>In Progress</option>
                                    <option value={"WAITINGONCUST"}>Waiting on Customer</option>
                                    <option value={"CLOSED"}>Closed</option>
                                </select>
                            </div>
                        </div>

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
                                    defaultValue='NORMAL'
                                    className={errors.priority && dirtyFields.priority ? 'form-select is-invalid' : 'form-select'}>
                                    <option value={"LOW"}>Low</option>
                                    <option value={"NORMAL"}>Normal</option>
                                    <option value={"HIGH"}>High</option>
                                    <option value={"CRITICAL"}>Critical</option>
                                </select>
                            </div>
                        </div>

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


                        {/* ================= CONTACT ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label"> Contact:</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select   {...register('contactId', {
                                    required: false,
                                    pattern: regexPatterns.alphaNumeric
                                })}
                                    className={errors.contact && dirtyFields.contact ? 'form-select is-invalid' : 'form-select'}>
                                    {customerContacts?.map(contact => <option value={contact.id} key={contact.id}>{contact.first_name} {contact.last_name} - {contact.job_title}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* ================= TECHNICIAN ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Assigned Technician:<span className={'text-danger'}></span></label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select   {...register('userId', {
                                    required: true,
                                    pattern: regexPatterns.numericSigned
                                })}
                                    defaultValue={loggedInUser}
                                    className={errors.technician && dirtyFields.technician ? 'form-select is-invalid' : 'form-select'}>
                                    <option value={-1} key={-1}>UNASSIGNED</option>
                                    {technicians?.map(technician => <option value={technician.id} key={technician.id}>{technician.first_name} {technician.last_name}</option>)}
                                </select>
                            </div>
                        </div>

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
                                    placeholder={"Technical Details"}></textarea>
                            </div>
                        </div>

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
                                    placeholder={"Customer Friendly Solution"}></textarea>
                            </div>
                        </div>

                         {/* ================= NOTES FIELD ====================== */}
                        <div className="mb-3 row align-items-center">
                            <div className="col-12 col-md-3">
                            <label className="form-label">Additional Notes</label>
                            </div>
                            <div className="col-12 col-md-9">
                            <textarea {...register('notes', {
                                required: false,
                                pattern: regexPatterns.alphaNumeric
                            })}
                                className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'}
                                rows="3"
                                placeholder={"Notes..."}></textarea>
                            </div>
                        </div>

                        <div className={"text-end"}>
                            <div>
                                <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                                <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                                <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Open Ticket" : "Submitting..."} disabled={!isValid} />
                            </div>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default TicketForm