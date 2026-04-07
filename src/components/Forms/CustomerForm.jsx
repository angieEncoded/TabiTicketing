import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import LargeModal from '../Modal/LargeModal';
import CustomerDisplay from "../Customer/CustomerDisplay";

const CustomerForm = () => {

    const [isPending, setIsPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customerData, setCustomerData] = useState(false);

    const urls = useSelector(state => state.urls.urls);

    // registration for the react form
    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        formState,
        formState: { errors, isValid, dirtyFields, isSubmitSuccessful },
    } = useForm({
        mode: 'onChange',
    })


  useEffect(() => {
    if (formState.isSubmitSuccessful) {
        reset();
        setShowModal(true); 
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

            const results = await fetch(urls.addNewCustomer, {
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
            if (serverResponse.error && serverResponse.error.length > 1){
                // !!! TODO - logging here
                setIsPending(false);
                toast.error(`Server responded with: ${serverResponse.error}`);
                return;
            }

            if (serverResponse.status == "200") {

                toast.success(`Successfully added new customer with uuid: ${serverResponse.results.uuid}`);
                setCustomerData(serverResponse.results);
                setIsPending(false);
 
                return;
            } else {
                setIsPending(false);
                toast.error(`${serverResponse.status} (Server Response)`);
                return;
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
            toast.error(`${error.message} - is the server down?`)
        }
    }

    const hideFormModal = () => {
        setShowModal(false);
    }



        return (

            <>


                {/* Once we have created the customer open the main display form */}
                {showModal && 
                
                    <LargeModal showFormModal={showModal} hideFormModal={hideFormModal} title={customerData.customer_name} >
                        <CustomerDisplay uuid={customerData.uuid}></CustomerDisplay>
                     </LargeModal>
                }

                <div className="form-background mb-5 mx-auto">
                    <h2 className="text-center noticaText">Add a new customer</h2>
                    <hr />

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">

                            {/* FIRST COLUMN */}
                            <div className="col-12 col-lg-6">

                                {/* ================= CUSTOMER NAME ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="col-form-label">Customer Name</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input {...register("customer_name", { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.customer_name && dirtyFields.customer_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Customer Name (Required)"} autoFocus={true} />
                                        {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>

                                {/* ================= PRIMARY PHONE NUMBER ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Primary Phone</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input {...register('primary_phone', { required: true, pattern: regexPatterns.phone })} className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 908-310-7603 (Required)"} />
                                        {/* {errors.primary_phone  <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>

                                {/* ================= CUSTOMER STATUS ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Customer Status:<span className={'text-danger'}></span></label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <select   {...register('status', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Active' className={errors.status  && dirtyFields.status   ? 'form-select is-invalid' : 'form-select'}>
                                            <option value={"Active"}>Active</option>
                                            <option value={"Inactive"}>Inactive</option>
                                            <option value={"Issue"}>SEE JEAN PAUL OR JUSTIN</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ================= NOTES FIELD ====================== */}
                                <div className="mb-3 row align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Notes</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.billing_city && dirtyFields.billing_city    ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."}></textarea>
                                        {/* {errors.notes  <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>
                            </div>


                            {/* SECOND COLUMN  (or below first)*/}
                            <div className="col-12 col-lg-6">

                                {/* ================= SECONDARY PHONE NUMBER ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Secondary Phone</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input {...register('secondary_phone', { required: false, pattern: regexPatterns.phone })} className={errors.secondary_phone && dirtyFields.secondary_phone    ? 'form-control is-invalid' : 'form-control'} placeholder={"Format: 908-310-7603 (Optional)"} />
                                        {/* {errors.secondary_phone  <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>

                                {/* ================= FAX NUMBER ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Fax</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input {...register('fax', { required: false, pattern: regexPatterns.phone })} className={errors.fax  && dirtyFields.fax   ? 'form-control is-invalid' : 'form-control'} placeholder={"Fax Number (Optional)"} />
                                        {/* {errors.fax  <span className="text-danger">This field is required</span>} */}
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
                                        <input  {...register('email', { required: false, pattern: regexPatterns.email })} className={errors.email  && dirtyFields.email ? 'form-control is-invalid' : 'form-control'} placeholder={"Email Address (Optional)"} />
                                        {/* {errors.email && <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>

                                {/* ================= WEBSITE ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <input  {...register('website', { required: false, pattern: regexPatterns.website })} className={errors.website  && dirtyFields.website   ? 'form-control is-invalid' : 'form-control'} placeholder={"Website (Optional)"} />
                                        {/* {errors.website && <span className="text-danger">This field is required</span>} */}
                                    </div>
                                </div>

                            </div>
                        </div>

                            <div className={"text-end"}>
                                <div>
                                    <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                                    <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Customer" : "Submitting..."} disabled={!isValid} />
                                </div>
                            </div>
                    </form>

                </div>

            </>
        )
    }

    export default CustomerForm