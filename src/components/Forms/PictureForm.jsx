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

const PictureForm = ({ recordType, closeComponent }) => {

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
        setError,
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
            <div className="form-background mb-5 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* ================= PICTURE TITLE ====================== */}
                    <div className="mb-3 row  align-items-center">
                        <div className="col-12 col-md-3">
                            <label className="form-label">Title:</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input {...register('title', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.product_name && dirtyFields.product_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Title: (Required)"} />
                        </div>
                    </div>

                    {/* ================= PICTURE LOCATION ====================== */}
                    <div className="mb-3 row  align-items-center">
                        <div className="col-12 col-md-3">
                            <label className="form-label">Equipment Location:</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input {...register('location', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.product_name && dirtyFields.product_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Location: (Optional)"} />
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

                    {/* ================= PICTURE FILE ====================== */}
                    <div className="mb-3 row  align-items-center">
                        <div className="col-12 col-md-3">
                            <label className="form-label">File:</label>
                        </div>
                        <div className="col-12 col-md-9">
                            <input type='file' {...register('picture_file', { required: true })} className={errors.license_file && dirtyFields.license_file ? 'form-control is-invalid' : 'form-control'} />
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

export default PictureForm