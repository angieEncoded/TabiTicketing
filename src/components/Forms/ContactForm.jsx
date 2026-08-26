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
import { getAllCustomers, getSelectedCustomerData } from "../../util/helperFunctions.js";
import urls from "../../util/apiPaths.json";

const salutations = [
    "",
    "Mr.",
    "Ms.",
    "Mrs.",
    "Mx.",
    "Dr.",
    "Prof.",
    "Rev.",
    "Hon.",
    "Capt.",
    "Col.",
    "Lt.",
    "Sgt."
]

const ContactForm = ({ recordType, closeComponent }) => {

    const [isPending, setIsPending] = useState(false);
    const selectedCustomer = useSelector(state => state.scust.customer);
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


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            cancelTask();
        }
    }, [formState, reset])

    const onSubmit = async (formData) => {

        setIsPending(true); // invoke our spinner

        // !!!TODO - update with logged in user
        const formPost = {
            ...formData,
            added_by: 'SYSTEM',
            updated_by: 'SYSTEM'
        }

        try {

            const results = await fetch(`${urls.contactAPI}/${recordType}/${selectedCustomer.id}`, {
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
                toast.success(`Successfully added new contact for ${selectedCustomer.customer_name}`);

                // Refresh the selected customer
                if (recordType === 'customer') {
                    const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                    if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
                }

                setIsPending(false)
                return;
            } else {
                setIsPending(false);
                toast.error(`${serverResponse.status} (Server Response)`);
                return;
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
            // console.log(error)
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


                    <div className="row">

                        {/* FIRST COLUMN */}
                        <div className="col-12 col-lg-6">

                            {/* ================= FIRST NAME ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">First Name</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('first_name', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.first_name && dirtyFields.first_name ? 'form-control is-invalid' : 'form-control'} placeholder={"First Name: (Required)"} />
                                </div>
                            </div>

                            {/* ================= LAST NAME ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Last Name</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('last_name', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.last_name && dirtyFields.last_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Last Name: (Required)"} />
                                </div>
                            </div>

                            {/* ================= WORK PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Work Phone</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('work_phone', { required: true, pattern: regexPatterns.phone })} className={errors.work_phone && dirtyFields.work_phone ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 908-310-7603 (Required)"} />
                                </div>
                            </div>
                            
                            {/* ================= EXTENSION ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Extension</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('extension', { required: false, pattern: regexPatterns.extensions })} className={errors.extension && dirtyFields.extension ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 8009 (Optional)"} />
                                </div>
                            </div>


                            {/* ================= JOB TITLE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Job Title</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('job_title', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.job_title && dirtyFields.job_title ? 'form-control is-invalid' : 'form-control'} placeholder={"Job Title: (Required)"} />
                                </div>
                            </div>

                            {/* ================= EMAIL ADDRESS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('email', { required: false, pattern: regexPatterns.email })} className={errors.email && dirtyFields.email ? 'form-control is-invalid' : 'form-control'} placeholder={"Email Address (Optional)"} />
                                </div>
                            </div>




                        </div>
                        {/* SECOND COLUMN  (or below first)*/}
                        <div className="col-12 col-lg-6">

                            {/* ================= SALUTATION ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Salutation</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('salutation', { required: false, pattern: regexPatterns.alphaNumeric })} defaultValue='NJ' className={errors.salutation && dirtyFields.salutation ? 'form-select is-invalid' : 'form-select'}>
                                        {salutations.map(salutation => <option key={salutation} value={salutation}>{salutation}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= MIDDLE NAME ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Middle Name</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('middle_name', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.middle_name && dirtyFields.middle_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Middle Name: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= CELL PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Cell Phone</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('cell_phone', { required: false, pattern: regexPatterns.phone })} className={errors.cell_phone && dirtyFields.cell_phone ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 908-310-7603 (Optional)"} />
                                </div>
                            </div>

                            {/* ================= FAX ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Fax</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('fax', { required: false, pattern: regexPatterns.phone })} className={errors.fax && dirtyFields.fax ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 908-310-7603 (Optional)"} />
                                </div>
                            </div>

                            {/* ================= NOTES FIELD ====================== */}
                            <div className="mb-3 row align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Notes</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={"text-end"}>
                        <div>
                            <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                            <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                            <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Contact" : "Submitting..."} disabled={!isValid} />
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ContactForm