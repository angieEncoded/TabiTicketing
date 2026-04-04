import { useForm } from "react-hook-form"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import usStates from "../../util/usStates.json";
import countries from "../../util/countries.json";
import Buttontabi from "../Button/Buttontabi";

const regexPatterns = {
        zip: /^[0-9]{5}(?:-[0-9]{4})?$/,
        alphaNumeric: /^[a-zA-Z0-9._-\s]+$/,
        phone: /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        date: /^[0-9]{4}[/-][0-9]{2}[/-][0-9]{2}$/,
        website: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/,
        middleInitial: /^[a-zA-Z0-9._-\s]{1}$/
    }


const CustomerFormWIP = ({ customerData, closeForm, isModal }) => {


    const [customerId, setCustomerId] = useState(customerData.id || undefined); // use state to manage this coming in or being set after we have added a new customer
    const [isPending, setIsPending] = useState(false);
    const [mainEmailOnClipboard, setMainEmailOnClipboard] = useState(false);
    const [formType, setFormType] = useState("new");


    const urls = useSelector(state => state.urls.urls);
    const disableEditing = false;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm({
        mode: 'onChange'
    })

    const clearForm = () => {
        // !!! TODO
    }


    const onSubmit = (data) => console.log(data)

    console.log(watch("example"))


    return (

        <>
            <div className="form-background mb-5 mx-auto">

                <h2 className="text-center noticaText">{customerId === undefined ? 'Add a new customer' : `Currently Viewing: ${customerName}`}</h2>

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
                                    <input {...register("customer_name", { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.customer_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Customer Name (Required)"} autoFocus={true} disabled={disableEditing} />
                                    {/* {errors.customer_name && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= COUNTY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">County</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register("county", { required: true, pattern:  regexPatterns.alphaNumeric })} className={errors.customer_name ? 'form-control is-invalid' : 'form-control'} placeholder={"County (Optional)"} disabled={disableEditing} />
                                    {/* {errors.county && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= PRIMARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Primary Phone</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('primary_phone', { required: true, pattern: regexPatterns.phone})} className={errors.primary_phone ? 'form-control is-invalid' : 'form-control'} placeholder={"Primary Phone Number (Required)"} disabled={disableEditing} />
                                    {/* {errors.primary_phone && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 1</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('billing_one', { required: true, pattern:  regexPatterns.alphaNumeric  })} className={errors.billing_one ? 'form-control is-invalid' : 'form-control'} placeholder={"Billing Address 1 (Required)"} disabled={disableEditing} />
                                    {/* {errors.billing_one && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS 2 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 2</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('billing_two', { required: false, pattern:  regexPatterns.alphaNumeric  })} className={errors.billing_two ? 'form-control is-invalid' : 'form-control'} placeholder={"Billing Address 2 (Optional)"} disabled={disableEditing} />
                                    {/* {errors.billing_two && <span className="text-danger">This field is required</span>}  */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address City</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input   {...register('billing_city', { required: true, pattern:  regexPatterns.alphaNumeric  })} className={errors.billing_city ? 'form-control is-invalid' : 'form-control'} placeholder={"Billing Address City (Required)"} disabled={disableEditing} />
                                    {/* {errors.billing_city && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address State</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('billing_state', { required: true, pattern:  regexPatterns.alphaNumeric  })} defaultValue='NJ' className={errors.billing_state ? 'form-select is-invalid' : 'form-select'} disabled={disableEditing}>
                                        {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS ZIP CODE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address Zip</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('billing_zip', { required: true, pattern: regexPatterns.zip})} className={errors.billing_zip ? 'form-control is-invalid' : 'form-control'} placeholder={"Billing Address Zip (Required)"} disabled={disableEditing} />
                                    {/* {errors.billing_zip && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS COUNTRY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address Country</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select  {...register('billing_country', { required: false, pattern: regexPatterns.alphaNumeric  })} defaultValue='US' className={errors.billing_country ? 'form-select is-invalid' : 'form-select'} disabled={disableEditing}>
                                        {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= NOTES FIELD ====================== */}
                            <div className="mb-3 row align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Notes</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.billing_city ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."} disabled={disableEditing}></textarea>
                                    {/* {errors.notes && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>
                        </div>


                        {/* SECOND COLUMN  (or below first)*/}
                        <div className="col-12 col-lg-6">

                            {/* ================= CUSTOMER STATUS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Customer Status:<span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select   {...register('status', { required: true, pattern:  regexPatterns.alphaNumeric })} defaultValue='Active' className={errors.status ? 'form-select is-invalid' : 'form-select'} disabled={disableEditing}>
                                        <option value={"Active"}>Active</option>
                                        <option value={"Inactive"}>Inactive</option>
                                        <option value={"Issue"}>SEE JEAN PAUL</option>
                                    </select>
                                </div>
                            </div>

                            {/* ================= SECONDARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Secondary Phone</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('secondary_phone', { required: false, pattern: regexPatterns.phone})} className={errors.secondary_phone ? 'form-control is-invalid' : 'form-control'} placeholder={"Secondary Phone Number (Optional)"} disabled={disableEditing} />
                                    {/* {errors.secondary_phone && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= FAX NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Fax</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('fax', { required: false, pattern: regexPatterns.phone})} className={errors.fax ? 'form-control is-invalid' : 'form-control'} placeholder={"Fax Number (Optional)"} disabled={disableEditing} />
                                    {/* {errors.fax && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= EMAIL ADDRESS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">
                                        Email {!mainEmailOnClipboard && <span className={"text-primary"}><i className="lar la-copy tabi-hover" onClick={() => copyToClipboard("email")}></i></span>}
                                        <span className="text-success">
                                            {mainEmailOnClipboard && <i className="las la-check"></i>}
                                        </span>
                                    </label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('email', { required: false, pattern: regexPatterns.email })} className={errors.email ? 'form-control is-invalid' : 'form-control'} placeholder={"Email Address (Optional)"} disabled={disableEditing} />
                                    {/* {errors.email && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= WEBSITE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('website', { required: false, pattern: regexPatterns.website })} className={errors.website ? 'form-control is-invalid' : 'form-control'} placeholder={"Website (Optional)"} disabled={disableEditing} />
                                    {/* {errors.website && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address 1</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('shipping_one', { required: false, pattern:  regexPatterns.alphaNumeric  })} className={errors.shipping_one ? 'form-control is-invalid' : 'form-control'} placeholder={"Shipping Address 1 (Optional)"} disabled={disableEditing} />
                                    {/* {errors.shipping_one && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS 2 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address 2</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input  {...register('shipping_two', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.shipping_two ? 'form-control is-invalid' : 'form-control'} placeholder={"Billing Address 2 (Optional)"} disabled={disableEditing} />
                                    {/* {errors.shipping_two && <span className="text-danger">This field is required</span>}  */}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address City</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input   {...register('shipping_city', { required: false, pattern:  regexPatterns.alphaNumeric })} className={errors.Shipping_city ? 'form-control is-invalid' : 'form-control'} placeholder={"Shipping Address City (Optional)"} disabled={disableEditing} />
                                    {/* {errors.shipping_city && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address State</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('shipping_state', { required: true, pattern:  regexPatterns.alphaNumeric })} defaultValue='NJ' className={errors.shipping_state ? 'form-select is-invalid' : 'form-select'} disabled={disableEditing}>
                                        {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS ZIP CODE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address Zip</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('shipping_zip', { required: false, pattern: regexPatterns.zip})} className={errors.shipping_zip ? 'form-control is-invalid' : 'form-control'} placeholder={"Shipping Address Zip (Optional)"} disabled={disableEditing} />
                                    {/* {errors.shipping_zip && <span className="text-danger">This field is required</span>} */}
                                </div>
                            </div>


                            {/* ================= SHIPPING ADDRESS COUNTRY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address Country</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select  {...register('shipping_country', { required: true, })} defaultValue='US' className={errors.shipping_country ? 'form-select is-invalid' : 'form-select'} disabled={disableEditing}>
                                        {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Set of buttons for a brand new form */}
                    {formType === 'new' &&
                        <div className={"text-end"}>
                            <div>
                                {isModal && <Buttontabi buttonClass={'secondary modal-close'} title={"Close Form"} onClick={closeForm} />}
                                <Buttontabi buttonClass={'secondary'} title={"Clear Form"} onClick={clearForm} />
                                <Buttontabi type={"submit"} buttonClass={'logo'} title={!isPending ? "Save Customer" : "Submitting..."} disabled={!isValid} />
                            </div>
                        </div>
                    }



                    {/* Set of buttons for when we have to edit a form */}
                    {formType === 'edit' &&
                        <div className={"d-flex justify-content-between"}>
                            <div>
                                {disableEditing && editingLock.status === 'UNLOCKED' && <Buttontabi type={"button"} buttonClass={'logo'} title={"Add another Customer"} onClick={() => resetComponent()} />}
                                {editingLock.status === 'LOCKED' && <Buttontabi type={"button"} buttonClass={lockPending ? 'danger' : 'warning'} title={lockPending ? "Releasing Lock..." : "Release Lock"} onClick={() => handleGettingEditLock("cancelEdit")} />}
                                {editingLock.lockRemainingTime > 1 && <span className="fst-italic ms-3">    Remaining time before lock expires: {formatRemainingSeconds(editingLock.lockRemainingTime)}</span>}
                            </div>
                            <div>
                                {editingLock.status === "UNLOCKED" && <Buttontabi type={"button"} buttonClass={lockPending ? 'danger' : 'logo'} title={lockPending ? "Obtaining Lock.." : "Lock this record for editing"} onClick={() => handleGettingEditLock("edit")} />}
                                {editingLock.status === "LOCKED" && <Buttontabi type={"button"} buttonClass={lockPending ? 'danger' : 'logo'} title={lockPending ? "Obtaining Lock.." : "Renew Lock"} onClick={() => handleGettingEditLock("edit")} />}
                                {isModal && <Buttontabi type={"button"} buttonClass={'secondary modal-close'} title={"Close Form"} onClick={closeForm} />}
                                {/* If editing is not disabled, we either are on a new form or we successfully obtained a lock */}
                                {!disableEditing && <Buttontabi type={"submit"} buttonClass={'logo'} title={!isPending ? "Save Customer" : <LoadingSmallLight title="Submitting..." />} disabled={!formIsValid} />}
                            </div>
                        </div>
                    }
                </form>

            </div>

        </>
    )
}

export default CustomerFormWIP