import React, { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedCustomerData, getCustomerTableData } from "../../util/helperFunctions";
import { toast } from 'react-toastify';
import Buttontabi from '../Button/Buttontabi';
import { useForm } from "react-hook-form"
import regexPatterns from '../../util/regexPatterns';
import urls from "../../util/apiPaths.json";

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

        if (value === "") {
            toast.warning("Nothing to copy");
            return;
        }

        if (type === "Email") { setClipboard("Email") }
        if (type === "Phone") { setClipboard("Phone") }
        if (type === "Phone2") { setClipboard("Phone2") }
        if (type === "Website") { setClipboard("Website") }

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
                const customerTableResults = await getCustomerTableData(dispatch);
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
                                <i className="las la-edit icon-hover"  onClick={() => swapToEditField("notes")}></i>
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
                                            <div className="col-12 col-md-9">
                                                <input {...register('primary_phone', { required: true, pattern: regexPatterns.phone })}
                                                    className={errors.primary_phone && dirtyFields.primary_phone ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Format: 908-310-7603 (Required)"}
                                                    defaultValue={selectedCustomer.primary_phone} />
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
                                                <input {...register('secondary_phone', { required: false, pattern: regexPatterns.phone })}
                                                    className={errors.secondary_phone && dirtyFields.secondary_phone ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Format: 908-310-7603 (Optional)"}
                                                    defaultValue={selectedCustomer.secondary_phone} />
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


                        </div>


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
                                                <input {...register('fax', { required: false, pattern: regexPatterns.phone })}
                                                    className={errors.fax && dirtyFields.fax ? 'form-control is-invalid' : 'form-control'}
                                                    placeholder={"Fax Number (Optional)"}
                                                    defaultValue={selectedCustomer.fax} />
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





                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default CustomerBasic