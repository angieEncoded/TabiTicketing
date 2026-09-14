import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedCustomerData, getAllCustomers } from "../../util/helperFunctions";
import { toast } from 'react-toastify';
import Buttontabi from '../Button/Buttontabi';
import { useForm } from "react-hook-form"
import regexPatterns from '../../util/regexPatterns';
import urls from "../../util/apiPaths.json";
import PhoneInput from 'react-phone-number-input/react-hook-form-input';


const CustomerBasic = ({ id }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [clipboard, setClipboard] = useState(false);
    const [editingField, setEditingField] = useState("empty");


    const selectedCustomer = useSelector(state => state.scust.customer)

    const dispatch = useDispatch();

    // registration for the react form
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        control,
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

    // handle these two timers with a reference
    const clipTimer = useRef(null);

    // Clean up any residuals on the clipboard
    useEffect(() => {

        // unmount callback to clean up some timer stuff
        return () => {
            if (clipTimer.current != null) {
                window.clearTimeout(clipTimer)
            }
        }
    }, [])


    const copyToClipboard = (type, value) => {

        if (value === "" || value == null) {
            toast.warning("Nothing to copy");
            return;
        }

        if (type === "Email") { setClipboard("Email") }
        if (type === "Phone") { setClipboard("Phone") }
        if (type === "Phone2") { setClipboard("Phone2") }
        if (type === "Website") { setClipboard("Website") }
        if (type === "vpn_endpoint") { setClipboard("vpn_endpoint") }

        clipTimer.current = setTimeout(() => {
            setClipboard(false);
        }, 3000);
        toast.success("Copied!");
        navigator.clipboard.writeText(value);

        return;
    }



    const onSubmit = async (formData) => {

        setIsPending(true); // invoke spinner


        const formPost = {
            ...formData,
            added_by: 'SYSTEM',
            updated_by: 'SYSTEM'
        }


        try {
            const results = await fetch(`${urls.customerAPI}/${selectedCustomer.id}`, {
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
                toast.success(`Successfully updated the customer.`);

                // refresh the background customer
                const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }

                // refresh the background table
                const customerTableResults = await getAllCustomers(dispatch);
                if (customerTableResults.status !== 200) { toast.error(`${customerTableResults.status} - ${customerTableResults.message}`) }

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
        <>
            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&
                <>
                    <hr />


                    {editingField && editingField === "notes" ?
                        <div className="row mb-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* ================= NOTES ====================== */}
                                <div className="mb-3 row  align-items-center">
                                    <div className="col-12 col-md-3">
                                        <label className="form-label">Notes</label>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <textarea {...register('notes', {
                                            required: false,
                                            pattern: regexPatterns.alphaNumeric
                                        })}
                                            className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'}
                                            placeholder={"notes"}
                                            defaultValue={selectedCustomer.notes}></textarea>
                                    </div>
                                </div>
                                <div className="float-end">
                                    <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                    <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                </div>
                            </form>
                        </div>
                        :

                        <div className="row mb-2">
                            <div className="col-2">Notes:</div>
                            <div className="col-8">
                                <div>{selectedCustomer.notes}</div>
                            </div>
                            <div className="col-2 ">
                                <i className="las la-edit icon-hover" onClick={() => swapToEditField("notes")}></i>
                            </div>
                        </div>



                    }







                    <hr />

                    <h5 className="text-center baskerville-font mb-3">Basic Information</h5>

                    <div className="row">
                        <div className="col-12 col-xl-6">




                            {editingField && editingField === "customer_name" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= CUSTOMER NAME ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Customer Name</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("customer_name", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.customer_name && dirtyFields.customer_name ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Customer Name (Required)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.customer_name} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Customer Name: </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.customer_name}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("customer_name")}></i>
                                    </div>
                                </div>
                            }




                            {editingField && editingField === "primary_phone" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* ================= PRIMARY PHONE NUMBER ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="form-label">Primary Phone</label>
                                            </div>


                                            <PhoneInput name="primary_phone" control={control} defaultCountry="US" className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'} placeholder="Format (908) 888-8177" defaultValue={selectedCustomer.primary_phone} />
                                            {/* {errors.primary_phone  <span className="text-danger">This field is required</span>} */}
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :

                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Primary Phone:
                                        {clipboard && clipboard === 'Phone' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone", selectedCustomer.primary_phone)}></i></span>}
                                    </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.primary_phone}</div>
                                    </div>
                                    <div className="col-lg-1"><i className="las la-edit icon-hover" onClick={() => swapToEditField("primary_phone")}></i></div>
                                </div>

                            }


                            {editingField && editingField === "secondary_phone" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= SECONDARY PHONE NUMBER ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="form-label">Secondary Phone</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                              <PhoneInput name="secondary_phone" control={control} defaultCountry="US" className={errors.secondary_phone && dirtyFields.secondary_phone ? 'form-control is-invalid' : 'form-control'} placeholder="Format (908) 888-8177" defaultValue={selectedCustomer.secondary_phone} />

                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Second Phone:
                                        {clipboard && clipboard === 'Phone2' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Phone2", selectedCustomer.secondary_phone)}></i></span>}
                                    </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.secondary_phone}</div>
                                    </div>
                                    <div className="col-lg-1"><i className="las la-edit icon-hover" onClick={() => swapToEditField("secondary_phone")}></i></div>
                                </div>

                            }




                            {editingField && editingField === "email_domain" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= EMAIL DOMAIN ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Email Domain</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("email_domain", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.email_domain && dirtyFields.email_domain ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Email Domain (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.email_domain} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Email Domain: </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.email_domain}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("email_domain")}></i>
                                    </div>
                                </div>
                            }

                            {editingField && editingField === "email_host" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= Email Hosting Provider ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Email Hosting Provider</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("email_host", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.email_host && dirtyFields.email_host ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Email Hosting Provider (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.email_host} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Email Hosting Provider </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.email_host}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("email_host")}></i>
                                    </div>
                                </div>
                            }



                            {editingField && editingField === "isp" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= Internet Service Provider ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">ISP</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("isp", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.isp && dirtyFields.isp ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Email Hosting Provider (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.isp} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">ISP </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.isp}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("isp")}></i>
                                    </div>
                                </div>
                            }


                            {editingField && editingField === "data_backup" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= PHONE SYSTEM ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Data Backup</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("data_backup", { required: false, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.data_backup && dirtyFields.data_backup ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Data Backup (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.data_backup} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Data Backup</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.data_backup}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("data_backup")}></i>
                                    </div>
                                </div>
                            }





                        </div>
                        { /* ---------------------------------------------------------------------------------------------------------*/}

                        <div className="col-12 col-xl-6">
                            {editingField && editingField === "fax" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= FAX NUMBER ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="form-label">Fax</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                              <PhoneInput name="fax" control={control} defaultCountry="US" className={errors.fax && dirtyFields.fax ? 'form-control is-invalid' : 'form-control'} placeholder="Format (908) 888-8177" defaultValue={selectedCustomer.fax} />
                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Fax:</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.fax}</div>
                                    </div>
                                    <div className="col-lg-1"><i className="las la-edit icon-hover" onClick={() => swapToEditField("fax")}></i></div>
                                </div>
                            }


                            {editingField && editingField === "vpn_endpoint" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* ================= VPN ENDPOINT ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">VPN Endpoint <span className={'text-danger'}></span></label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input  {...register('vpn_endpoint', { required: false, pattern: regexPatterns.website })}
                                                    className={errors.vpn_endpoint && dirtyFields.vpn_endpoint ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"VPN Endpoint (Optional)"}
                                                    defaultValue={selectedCustomer.vpn_endpoint} />

                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :

                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">VPN Endpoint:
                                        {clipboard && clipboard === 'vpn_endpoint' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("vpn_endpoint", selectedCustomer.vpn_endpoint)}></i></span>}
                                    </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.vpn_endpoint}</div>
                                    </div>
                                    <div className="col-lg-1"><i className="las la-edit icon-hover" onClick={() => swapToEditField("vpn_endpoint")}></i></div>
                                </div>
                            }






                            {editingField && editingField === "website" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* ================= WEBSITE ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input  {...register('website', { required: false, pattern: regexPatterns.website })}
                                                    className={errors.website && dirtyFields.website ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Website (Optional)"}
                                                    defaultValue={selectedCustomer.website} />

                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :

                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Website:
                                        {clipboard && clipboard === 'Website' ? <span className="text-success"> <i className="las la-check mx-2"></i></span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Website", selectedCustomer.website)}></i></span>}
                                    </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.website}</div>
                                    </div>
                                    <div className="col-lg-1"><i className="las la-edit icon-hover" onClick={() => swapToEditField("website")}></i></div>
                                </div>
                            }






                            {editingField && editingField === "email" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* ================= EMAIL ADDRESS ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="form-label">
                                                    Email
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input  {...register('email', { required: false, pattern: regexPatterns.email })}
                                                    className={errors.email && dirtyFields.email ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Email Address (Optional)"}
                                                    defaultValue={selectedCustomer.email} />

                                            </div>
                                        </div>
                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Email:
                                        {clipboard && clipboard === 'Email' ? <span className="text-success"> <i className="las la-check mx-2"></i>  </span> : <span className={"text-primary"}><i className="lar la-copy tabi-hover mx-2" onClick={() => copyToClipboard("Email", selectedCustomer.email)}></i></span>}
                                    </div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.email}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("email")}></i>
                                    </div>
                                </div>

                            }




                            {editingField && editingField === "dns" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= dns Provider ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">DNS Provider</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("dns", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.dns && dirtyFields.dns ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"DNS Provider (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.dns} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">DNS Provider</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.dns}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("dns")}></i>
                                    </div>
                                </div>
                            }

                            {editingField && editingField === "office_suite" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= OFFICE SUITE ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Office Suite</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("office_suite", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.office_suite && dirtyFields.office_suite ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Office Suite (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.office_suite} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Office Suite</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.office_suite}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("office_suite")}></i>
                                    </div>
                                </div>
                            }

                            {editingField && editingField === "server_domain" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= SERVER DOMAIN ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Server Domain</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("server_domain", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.server_domain && dirtyFields.server_domain ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Server Domain (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.server_domain} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Server Domain</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.server_domain}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("server_domain")}></i>
                                    </div>
                                </div>
                            }



                            {editingField && editingField === "phone_system" ?
                                <div className="row mb-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        {/* ================= PHONE SYSTEM ====================== */}
                                        <div className="mb-3 row  align-items-center">
                                            <div className="col-12 col-md-3">
                                                <label className="col-form-label">Phone System</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input {...register("phone_system", { required: true, pattern: regexPatterns.alphaNumeric })}
                                                    className={errors.phone_system && dirtyFields.phone_system ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Phone System (Optional)"}
                                                    autoFocus={true}
                                                    defaultValue={selectedCustomer.phone_system} />

                                            </div>
                                        </div>

                                        <div className="float-end">
                                            <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                                            <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="row mb-2">
                                    <div className="col-lg-4 d-none d-lg-block">Phone System</div>
                                    <div className="col-lg-7">
                                        <div>{selectedCustomer.phone_system}</div>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="las la-edit icon-hover" onClick={() => swapToEditField("phone_system")}></i>
                                    </div>
                                </div>
                            }





                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default CustomerBasic