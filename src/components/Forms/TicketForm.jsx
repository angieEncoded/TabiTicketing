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
import { getTechnicianData } from "../../util/helperFunctions.js";



const TicketForm = ({ recordType, closeComponent }) => {

    const loggedInUser = 3;

    const [isPending, setIsPending] = useState(false);


    const urls = useSelector(state => state.urls.urls);
    const selectedCustomer = useSelector(state => state.scust.customer);
    const customerContacts = useSelector(state => state.scust.customer.contacts);
    const technicians = useSelector(state => state.technicians.technicians);
    const customerProjects = useSelector(state => state.projects.projects);

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


    // Get all the contacts attached to the current customer and load into slice
    useEffect(() => {


        const getTechnicians = async () => {
            const techniciansResults = await getTechnicianData(`${urls.techniciansAPI}/technicians`, dispatch);
            if (techniciansResults.status !== 200) { toast.error(`${techniciansResults.status} - ${techniciansResults.message}`) }
        }


        const getProjectsData = async () => {
            try {

                setIsPending(true);
                const projectsData = await fetch(`${urls.projectsAPI}`);
                if (!projectsData.ok) throw new Error("Failed to fetch project data. Projects may not be loaded.");
                const projectsJson = await projectsData.json();
                console.log(projectsJson);
            
                // Make sure to handle the errors
                if(projectsJson.status == 200){
                    dispatch(projectActions.loadProjectData(projectsJson));
                    setIsPending(false);
                } else {
                    throw new Error(projectsJson);
                    setIsPending(false);
                }

            } catch (error) {
                setError("root.serverError", { type: error.status }) // prevent the form from clearing
                toast.error(`Error: ${error.status} ${error.message}`)
                setIsPending(false);
            }
        }

        getTechnicians();
    }, []);


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            cancelTask();
        }
    }, [formState, reset])

    const onSubmit = async (data) => {

        setIsPending(true); // invoke our spinner

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('location', data.location);
        formData.append('notes', data.notes);
        formData.append('added_by', 'SYSTEM');
        formData.append('updated_by', 'SYSTEM');
        formData.append('customer_name', selectedCustomer.customer_name)

        if (data.picture_file && data.picture_file[0]) {
            formData.append("picture_file", data.picture_file[0]);
        }

        try {

            const results = await fetch(`${urls.pictureAPI}/${recordType}/${selectedCustomer.id}`, {
                method: "POST",
                body: formData
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
                toast.success(`Successfully added a new picture for ${selectedCustomer.customer_name}`);

                // Refresh the selected customer
                if (recordType === 'customer') {
                    const selectedCustomerData = await fetch(`${urls.customerAPI}/${selectedCustomer.id}`);
                    if (!selectedCustomerData.ok) throw new Error("Failed to fetch customer data. Please refresh the system.");
                    const selectedCustomerJson = await selectedCustomerData.json();
                    dispatch(selectedCustomerActions.loadCustomerData(selectedCustomerJson));
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
                                required: true,
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
                                <option value={"COMPLETED"}>Completed</option>
                                <option value={"WAITINGONCUST"}>Waiting on Customer</option>
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

                    {/* ================= CONTACT ====================== */}
                    <div className="mb-3 row  align-items-center">
                        <div className="col-12 col-md-3">
                            <label className="form-label"> Contact:</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <select   {...register('contact', {
                                required: true,
                                pattern: regexPatterns.alphaNumeric
                            })}
                                className={errors.contact && dirtyFields.contact ? 'form-select is-invalid' : 'form-select'}>
                                <option value={"NO CONTACT SELECTED"} key={"NOCONTACT"}>NO CONTACT SELECTED</option>
                                {customerContacts.map(contact => <option value={contact.id} key={contact.id}>{contact.first_name} {contact.last_name} - {contact.job_title}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* ================= TECHNICIAN ====================== */}
                    <div className="mb-3 row  align-items-center">
                        <div className="col-12 col-md-3">
                            <label className="form-label">Assigned Technician:<span className={'text-danger'}></span></label>
                        </div>
                        <div className="col-12 col-md-9">
                            <select   {...register('technician', {
                                required: true,
                                pattern: regexPatterns.alphaNumeric
                            })}
                                defaultValue={loggedInUser}
                                className={errors.technician && dirtyFields.technician ? 'form-select is-invalid' : 'form-select'}>
                                <option value={"NONE"} key={"NONE"}>NO TECHNICIAN SELECTED</option>
                                {technicians.map(technician => <option value={technician.id} key={technician.id}>{technician.first_name} {technician.last_name}</option>)}
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
                                required: true,
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
                                required: true,
                                pattern: regexPatterns.alphaNumeric
                            })}
                                className={errors.customer_solution && dirtyFields.customer_solution ? 'form-control is-invalid' : 'form-control'}
                                placeholder={"Customer Friendly Solution"}></textarea>
                        </div>
                    </div>

                    <div className={"text-end"}>
                        <div>
                            <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                            <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                            <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Picture" : "Submitting..."} disabled={!isValid} />
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default TicketForm