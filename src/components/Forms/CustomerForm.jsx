import { useForm, Controller  } from "react-hook-form"
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import LargeModal from '../Modal/LargeModal';
import urls from "../../util/apiPaths.json";
import ModalNavigationWrapper from "../Customer/ModalNavigationWrapper.jsx";
import PhoneInput from 'react-phone-number-input/react-hook-form-input';

const CustomerForm = () => {

    const [isPending, setIsPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customerId, setCustomerId] = useState(0);

    const selectedCustomerForModal = useSelector(state => state.scust.customer);

    const {
        register,
        handleSubmit,
        control,
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

            const results = await fetch(urls.customerAPI, {
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
                toast.success(`Successfully added ${serverResponse.customer.customer_name}`);
                setCustomerId(serverResponse.customer.id);
                // update customer for display in the modal
                // const results = await getSelectedCustomerData(serverResponse.customer.id, dispatch);
                // if (results.status !== 200) { toast.error(`${results.status} - ${results.message}`) }

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

                <LargeModal showFormModal={showModal} hideFormModal={hideFormModal} title={selectedCustomerForModal.customer_name}>
                    <ModalNavigationWrapper id={customerId}></ModalNavigationWrapper>
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


                                <PhoneInput name="primary_phone" control={control} defaultCountry="US" className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'}  placeholder="Format (908) 888-8177"/>
                                {/* {errors.primary_phone  <span className="text-danger">This field is required</span>} */}

                                </div>
                            </div>

                            {/* ================= CUSTOMER STATUS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Customer Status:<span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select   {...register('status', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Active' className={errors.status && dirtyFields.status ? 'form-select is-invalid' : 'form-select'}>
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
                                    <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."}></textarea>
                                    {/* {errors.notes  <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>



                            {/* ================= EMAIL DOMAIN ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Email Domain</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("email_domain", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.email_domain && dirtyFields.email_domain ? 'form-control is-invalid' : 'form-control'} placeholder={"Email Domain (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>     

                            {/* ================= EMAIL HOST ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Email Hosting Provider</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("email_host", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.email_host && dirtyFields.email_host ? 'form-control is-invalid' : 'form-control'} placeholder={"Email Hosting provider (Optional)"}/>
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= INTERNET SERVICE PROVIDER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Internet Service Provider</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("isp", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.isp && dirtyFields.isp ? 'form-control is-invalid' : 'form-control'} placeholder={"Internet Service Provider (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
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
                                <PhoneInput name="secondary_phone" control={control} defaultCountry="US" className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'}  placeholder="Format (908) 888-8177"/>
                                {/* {errors.primary_phone  <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= FAX NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Fax</label>
                                </div>
                                <div className="col-12 col-md-9">
                                <PhoneInput name="fax" control={control} defaultCountry="US" className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'} placeholder="Format (908) 888-8177"/>
                                {/* {errors.primary_phone  <span className="text-danger">This field is required</span>} */}
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
                                    {/* {errors.email && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= WEBSITE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('website', { required: false, pattern: regexPatterns.website })} className={errors.website && dirtyFields.website ? 'form-control is-invalid' : 'form-control'} placeholder={"Website (Optional)"} />
                                    {/* {errors.website && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>
                            {/* ================= MICROSOFT OFFICE SUITE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Office Suite\Microsoft 365</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("office_suite", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.office_suite && dirtyFields.office_suite ? 'form-control is-invalid' : 'form-control'} placeholder={"Microsoft Office Suite (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>
                            
                            {/* ================= SERVER DOMAIN ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Server Domain</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("server_domain", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.server_domain && dirtyFields.server_domain ? 'form-control is-invalid' : 'form-control'} placeholder={"Server Domain (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>    

                            {/* ================= PHONE SYSTEM ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Phone System</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("phone_system", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.phone_system && dirtyFields.phone_system ? 'form-control is-invalid' : 'form-control'} placeholder={"Phone System (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= DATA BACKUP ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Data Backup</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("data_backup", { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.data_backup && dirtyFields.data_backup ? 'form-control is-invalid' : 'form-control'} placeholder={"Data Backup System (Optional)"} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
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