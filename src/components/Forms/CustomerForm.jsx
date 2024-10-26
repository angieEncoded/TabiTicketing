import React, { useEffect, useState } from 'react'
import {
    requiredAddressCheck, requiredNameCheck, requiredZipCheck, requiredCityStateCheck, requiredPhoneCheck, optionalAddressCheck,
    optionalTextcheck, optionalPhoneCheck, optionalEmailCheck, optionalCityStateCheck, optionalZipCheck
} from "../../util/regExCheckers" // Import my regex checker functions
import { formatRemainingSeconds } from "../../util/helperFunctions"
import saveLogData from "../../util/logging"
import Buttontabi from "../Button/Buttontabi";
import Loading from '../LoadingScreens/Loading';
import LoadingSmallLight from "../LoadingScreens/LoadingSmall"
import useInput from '../../hooks/useInput';
import useSelect from "../../hooks/useSelect"
import { toast } from "react-toastify";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// incoming customer data can be {'id': undefined}
const CustomerForm = ({ customerData, closeForm, isModal }) => {

    const [customerId, setCustomerId] = useState(customerData.id || undefined); // use state to manage this coming in or being set after we have added a new customer
    const [isPending, setIsPending] = useState(false);
    const [lockPending, setLockPending] = useState(false)
    const [disableEditing, setDisableEditing] = useState(false)
    const [editingLock, setEditingLock] = useState({ status: "UNLOCKED", lockRemainingTime: 0, currentIntervalId: 0 });
    const [formType, setFormType] = useState("new");
    const [countdownId, setCountdownId] = useState(0);
    const [mainEmailOnClipboard, setMainEmailOnClipboard] = useState(false);


    const urls = useSelector(state => state.urls.urls);

    // handle these two timers with a reference
    const emailTimer = useRef(null);
    const alternateEmailTimer = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {

        // unmount callback to clean up some timer stuff
        return () => {
            if (emailTimer.current != null) {
                window.clearTimeout(emailTimer)
            }
            if (alternateEmailTimer.current != null) {
                window.clearTimeout(alternateEmailTimer)
            }
        }
    }, [])


    useEffect(() => {
        if (customerId !== undefined) {
            setFormType("edit");
            prePopulateForm(customerData);
            setDisableEditing(true);
            setIsPending(false);
        }

        // cleanup the interval on unmount if the user decided to just closes it up
        return () => {
            clearInterval(countdownId)
        }
    }, []);



    // CUSTOMER NAME HANDLER
    // ================================================
    const { value: customerName,
        valueIsValid: customerNameIsValid,
        hasError: customerNameHasError,
        resetInput: resetCustomerNameInput,
        valueChangeHandler: customerNameChangeHandler,
        initialValueHandler: setCustomerName,
        valueBlurHandler: customerNameBlur
    } = useInput(requiredNameCheck);

    // CUSTOMER PRIMARY PHONE
    // ================================================
    const { value: primaryPhone,
        valueIsValid: primaryPhoneIsValid,
        hasError: primaryPhoneHasError,
        resetInput: resetprimaryPhoneInput,
        valueChangeHandler: primaryPhoneChangeHandler,
        initialValueHandler: setPrimaryPhone,
        valueBlurHandler: primaryPhoneBlur
    } = useInput(requiredPhoneCheck);

    // CUSTOMER SECONDARY PHONE
    // ================================================
    const { value: secondaryPhone,
        valueIsValid: secondaryPhoneIsValid,
        hasError: secondaryPhoneHasError,
        resetInput: resetSecondaryPhoneInput,
        valueChangeHandler: secondaryPhoneChangeHandler,
        initialValueHandler: setSecondaryPhone,
        valueBlurHandler: secondaryPhoneBlur
    } = useInput(optionalPhoneCheck);

    // CUSTOMER FAX
    // ================================================
    const { value: fax,
        valueIsValid: faxIsValid,
        hasError: faxHasError,
        resetInput: resetFaxInput,
        valueChangeHandler: faxChangeHandler,
        initialValueHandler: setFax,
        valueBlurHandler: faxBlur
    } = useInput(optionalPhoneCheck);

    // CUSTOMER EMAIL HANDLER
    // ================================================
    const { value: email,
        valueIsValid: emailIsValid,
        hasError: emailHasError,
        resetInput: resetEmailInput,
        valueChangeHandler: emailChangeHandler,
        initialValueHandler: setCustomerEmail,
        valueBlurHandler: emailBlur
    } = useInput(optionalEmailCheck);

    // CUSTOMER WEBSITE INPUT HANDLER
    // ================================================
    const { value: website,
        valueIsValid: websiteIsValid,
        hasError: websiteHasError,
        resetInput: resetWebsiteInput,
        valueChangeHandler: websiteChangeHandler,
        initialValueHandler: setWebsite,
        valueBlurHandler: websiteBlur
    } = useInput(optionalTextcheck);


    // CUSTOMER NOTES INPUT HANDLER
    // ================================================
    const { value: customerNotes,
        valueIsValid: customerNotesIsValid,
        hasError: customerNotesHasError,
        resetInput: resetCustomerNotesInput,
        valueChangeHandler: customerNotesChangeHandler,
        initialValueHandler: setCustomerNotes,
        valueBlurHandler: notesBlur
    } = useInput(optionalTextcheck);

    // CUSTOMER BILLING ADDRESS ONE HANDLER
    // ================================================
    const { value: billingAddressOne,
        valueIsValid: billingAddressOneIsValid,
        hasError: billingAddressOneHasError,
        resetInput: resetBillingAddressOneInput,
        valueChangeHandler: billingAddressOneChangeHandler,
        initialValueHandler: setBillingAddressOne,
        valueBlurHandler: billingAddressOneBlur
    } = useInput(requiredAddressCheck);

    // CUSTOMER BILLING ADDRESS TWO HANDLER
    // ================================================
    const { value: billingAddressTwo,
        valueIsValid: billingAddressTwoIsValid,
        hasError: billingAddressTwoHasError,
        resetInput: resetBillingAddressTwoInput,
        valueChangeHandler: billingAddressTwoChangeHandler,
        initialValueHandler: setBillingAddressTwo,
        valueBlurHandler: billingAddressTwoBlur
    } = useInput(optionalAddressCheck);

    // CUSTOMER BILLING CITY HANDLER
    // ================================================
    const { value: billingAddressCity,
        valueIsValid: billingAddressCityIsValid,
        hasError: billingAddressCityHasError,
        resetInput: resetBillingAddressCityInput,
        valueChangeHandler: billingAddressCityChangeHandler,
        initialValueHandler: setBillingAddressCity,
        valueBlurHandler: billingAddressCityBlur
    } = useInput(requiredCityStateCheck);

    // CUSTOMER BILLING STATE HANDLER
    // ================================================
    const { value: billingAddressState,
        valueIsValid: billingAddressStateIsValid,
        hasError: billingAddressStateHasError,
        resetInput: resetBillingAddressStateInput,
        valueChangeHandler: billingAddressStateChangeHandler,
        initialValueHandler: setBillingAddressState,
        valueBlurHandler: billingAddressStateBlur
    } = useSelect(requiredCityStateCheck, "PA");

    //  CUSTOMER BILLING ZIP HANDLER
    // ================================================
    const { value: billingAddressZip,
        valueIsValid: billingAddressZipIsValid,
        hasError: billingAddressZipHasError,
        resetInput: resetBillingAddressZipInput,
        valueChangeHandler: billingAddressZipChangeHandler,
        initialValueHandler: setBillingAddressZip,
        valueBlurHandler: billingAddressZipBlur
    } = useInput(requiredZipCheck);


    // CUSTOMER SHIPPING ADDRESS ONE HANDLER
    // ================================================
    const { value: shippingAddressOne,
        valueIsValid: shippingAddressOneIsValid,
        hasError: shippingAddressOneHasError,
        resetInput: resetShippingAddressOneInput,
        valueChangeHandler: shippingAddressOneChangeHandler,
        initialValueHandler: setShippingAddressOne,
        valueBlurHandler: shippingAddressOneBlur
    } = useInput(optionalAddressCheck);

    // CUSTOMER SHIPPING ADDRESS TWO HANDLER
    // ================================================
    const { value: shippingAddressTwo,
        valueIsValid: shippingAddressTwoIsValid,
        hasError: shippingAddressTwoHasError,
        resetInput: resetShippingAddressTwoInput,
        valueChangeHandler: shippingAddressTwoChangeHandler,
        initialValueHandler: setShippingAddressTwo,
        valueBlurHandler: shippingAddressTwoBlur
    } = useInput(optionalAddressCheck);

    // CUSTOMER SHIPPING ADDRESS CITY HANDLER
    // ================================================
    const { value: shippingAddressCity,
        valueIsValid: shippingAddressCityIsValid,
        hasError: shippingAddressCityHasError,
        resetInput: resetShippingAddressCityInput,
        valueChangeHandler: shippingAddressCityChangeHandler,
        initialValueHandler: setShippingAddressCity,
        valueBlurHandler: shippingAddressCityBlur
    } = useInput(optionalCityStateCheck);

    // CUSTOMER SHIPPING ADDRESS STATE HANDLER
    // ================================================
    const { value: shippingAddressState,
        valueIsValid: shippingAddressStateIsValid,
        hasError: shippingAddressStateHasError,
        resetInput: resetShippingAddressStateInput,
        valueChangeHandler: shippingAddressStateChangeHandler,
        initialValueHandler: setShippingAddressState,
        valueBlurHandler: shippingAddressStateBlur
    } = useSelect(optionalCityStateCheck, "PA");

    // CUSTOMER SHIPPING ADDRESS ZIP HANDLER
    // ================================================
    const { value: shippingAddressZip,
        valueIsValid: shippingAddresszipIsValid,
        hasError: shippingAddressZipHasError,
        resetInput: resetShippingAddressZipInput,
        valueChangeHandler: shippingAddressZipChangeHandler,
        initialValueHandler: setShippingAddressZip,
        valueBlurHandler: shippingAddressZipBlur
    } = useInput(optionalZipCheck);





































    // Helper function to clear all the inputs at once
    const clearForm = () => {
        resetCustomerNameInput();
        resetprimaryPhoneInput();
        resetSecondaryPhoneInput();
        resetFaxInput();
        resetEmailInput();
        resetwebsiteInput();
        resetCustomerNotesInput();
        resetBillingAddressOneInput();
        resetBillingAddressTwoInput();
        resetBillingAddressCityInput();
        resetBillingAddressStateInput();
        resetBillingAddressZipInput();
        resetShippingAddressOneInput();
        resetShippingAddressTwoInput();
        resetShippingAddressCityInput();
        resetShippingAddressStateInput();
        resetShippingAddressZipInput();

    }

    // prepopulate the form if we are here to do edits
    const prePopulateForm = (incomingData) => {
        setCustomerName(incomingData.customer_name);
        setPrimaryPhone(incomingData.primary_phone);
        setSecondaryPhone(incomingData.secondary_phone)
        setFax(incomingData.fax);
        setCustomerEmail(incomingData.email);
        setWebsite(incomingData.website);
        setCustomerNotes(incomingData.notes);
        setBillingAddressOne(incomingData.billing_address_one);
        setBillingAddressTwo(incomingData.billing_address_two);
        setBillingAddressCity(incomingData.billing_address_city);
        setBillingAddressState(incomingData.billing_address_state);
        setBillingAddressZip(incomingData.billing_address_zip);
        setShippingAddressOne(incomingData.shipping_address_one);
        setShippingAddressTwo(incomingData.shipping_address_two);
        setShippingAddressCity(incomingData.shipping_address_city);
        setShippingAddressState(incomingData.shipping_address_state);
        setShippingAddressZip(incomingData.shipping_address_zip);
    }

    const resetComponent = () => {
        setCustomerId(undefined)
        setIsPending(false)
        setDisableEditing(false)
        setEditingLock(false)
        setFormType('new')
        clearForm();
    }


    // OVERALL FORM LOGIC BELOW HERE
    // ===============================================
    let formIsValid = false; // set up a variable to handle the overall form validity

    // When all the checks pass, form is valid and we can show the save button
    if (customerNameIsValid &&
        primaryPhoneIsValid &&
        secondaryPhoneIsValid &&
        faxIsValid &&
        emailIsValid &&
        websiteIsValid &&
        customerNotesIsValid &&
        billingAddressOneIsValid &&
        billingAddressTwoIsValid &&
        billingAddressCityIsValid &&
        billingAddressStateIsValid &&
        billingAddressZipIsValid &&
        shippingAddressOneIsValid &&
        shippingAddressTwoIsValid &&
        shippingAddressCityIsValid &&
        shippingAddressStateIsValid &&
        shippingAddresszipIsValid

    ) {
        formIsValid = true;
    }

    // Handle form submission
    const formSubmissionHandler = async (event) => {

        event.preventDefault();
        if (!formIsValid) { return; }

        // We are now working on submission, please wait
        setIsPending(true);

        // set up the basic post
        const formPost = {
            customer_name: customerName,
            primary_phone: primaryPhone,
            secondary_phone: secondaryPhone,
            fax: fax,
            email: email,
            website: website,
            notes: customerNotes,
            billing_address_one: billingAddressOne,
            billing_address_two: billingAddressTwo,
            billing_address_city: billingAddresscity,
            billing_address_state: billingAddressState,
            billing_address_zip: billingAddresszip,
            billing_address_country: "US",
            shipping_address_one: shippingAddressOne,
            shipping_address_two: shippingAddressTwo,
            shipping_address_city: shippingAddresscity,
            shipping_address_state: shippingAddressState,
            shipping_address_zip: shippingAddresszip,
            shipping_address_country: "US",
        }

        // EDIT EXISTING RECORD
        //=================================================================================
        if (customerId !== undefined) {

            if (!editingLock.status === "LOCKED") {
                toast.error("You don't seem to have an editing lock on that record.")
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0, currentIntervalId: 0 });
                setLockPending(false)
                return;
            }

            formPost.custid = customerId;

            try {
                const results = await fetch(`${urls.getCustomerById}${customerId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formPost)
                })

                if (!results.ok) { throw new Error(results.statusText) }
                const serverResponse = await results.json();

                // If we are successful
                if (serverResponse.status === "200" && serverResponse.message === "Success") {

                    toast.success(`Successfully updated customer with id: ${serverResponse.custid}`)

                    // request the entire new record from the database
                    const savedCustomerRecord = await fetch(`${urls.getCustomerById}${serverResponse.custid}`)
                    if (!savedCustomerRecord.ok) { throw new Error(savedCustomerRecord.statusText) }
                    const savedCustomerRecordJson = await savedCustomerRecord.json();

                    // dispach to the store to update with the latest from the database
                    dispatch(fetchCustomersDataForTable(urls));

                    // Populate everything we need to for editing the customer
                    setDisableEditing(true);
                    prePopulateForm(savedCustomerRecordJson.customer[0])
                    setCustomerId(serverResponse.custid)
                    setFormType("edit");
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    setIsPending(false)
                    return;
                } else {
                    throw new Error(serverResponse.message)
                }
            } catch (error) {
                setIsPending(false)
                toast.error(error.message)
                saveLogData({
                    module: "add-customer catch block",
                    error: error,
                    note: "Something threw an error into the catch block"
                })
            }
        }

        // SAVE NEW RECORD
        //=================================================================================
        if (customerId === undefined) {

            // ensure it's a new record
            formPost.custid = customerId;

            try {
                const results = await fetch(urls.getCustomerById, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formPost)
                })

                // if server cannot respond
                if (!results.ok) {
                    setIsPending(false)
                    toast.error(`${results.statusText}`)
                    saveLogData({
                        module: "CUSTOMERS ADD",
                        error: results.statusText,
                        note: results.status
                    })
                    return;
                }

                const serverResponse = await results.json()

                // If we are successful
                if (serverResponse.status === "200" && serverResponse.message === "Success") {

                    toast.success(`Successfully added new customer with id: ${serverResponse.custid}`)

                    // request the entire new record from the database
                    const savedCustomerRecord = await fetch(`${urls.getCustomerById}${serverResponse.custid}`)
                    if (!savedCustomerRecord.ok) {
                        toast.error(`${serverResponse.message} (Server Response)`)
                        setIsPending(false)
                        saveLogData({
                            module: "",
                            error: results.statusText,
                            note: results.status
                        })
                        return;
                    }
                    const savedCustomerRecordJson = await savedCustomerRecord.json();


                    // Populate everything we need to for editing the customer
                    setDisableEditing(true);
                    prePopulateForm(savedCustomerRecordJson.customer[0])
                    setCustomerId(serverResponse.custid)
                    setFormType("edit");

                    // finally we are done and can render the component
                    setIsPending(false)
                    return;
                } else {
                    setIsPending(false)
                    toast.error(`${serverResponse.message} (Server Response)`)
                    return;
                }
            } catch (error) {
                setIsPending(false)
                toast.error(`Did not get a response from the server, please call tabi at 1-800-225-6699`)
                saveLogData({
                    module: "add-customer",
                    error: error,
                    note: "Something threw an error into the catch block"
                })

            }
            return;
        }
        //=================================================================================
    }

    // Handle getting and releasing the record lock
    const handleGettingEditLock = async (requestType) => {

        if (requestType === "edit") {
            try {
                // Set our pending state and clear any intervals
                setLockPending(true)
                if (countdownId) { clearInterval(countdownId) }

                const getLock = await fetch(`${urls.obtainRecordLock}${customerId}?lock_type=customer`)

                if (!getLock.ok) {
                    toast.error("unable to reach the server.", { position: 'top-center' })
                    setDisableEditing(true)
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    return;
                }

                const serverResponse = await getLock.json()

                if (serverResponse.status === "LOCKED") {
                    setDisableEditing(false)
                    setLockPending(false)
                    toast.success("Successfully locked the record!")
                } else {
                    toast.error("unable to obtain a lock, someone may have the record locked already.", { position: 'top-center' })
                    setDisableEditing(true)
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    return;
                }

                setEditingLock({ status: "LOCKED", lockRemainingTime: 300 }) // update the state slice with the new calue
                const currentCountdownId = setInterval(() => {
                    setEditingLock((previousState => {
                        const tick = previousState.lockRemainingTime - 1
                        // if we get to 0 inside the interval, clear it and get the records locked again
                        if (tick === 0) {
                            setDisableEditing(true)
                            setLockPending(false)
                            clearInterval(currentCountdownId)
                            setCountdownId(0)
                            return { status: "UNLOCKED", lockRemainingTime: 0 }
                        }
                        return {
                            ...previousState,
                            lockRemainingTime: tick
                        }
                    }))
                }, 1000); // 1 second ticks
                setCountdownId(currentCountdownId); // keep track of the interval so we can clear it
            } catch (error) {
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                setLockPending(false)
                toast.error("We ran into a problem, please contact tabi.")
                saveLogData({
                    module: "Getting editing lock in customers",
                    error: error,
                    note: "Something threw an error into the catch block"
                })
            }
        }

        if (requestType === "cancelEdit") {
            try {
                setLockPending(true)
                const getUnlock = await fetch(`${urls.releaseRecordLock}${customerId}?lock_type=customer`)

                if (!getUnlock.ok) {
                    toast.error("unable to reach the server.", { position: 'top-center' })
                    setDisableEditing(true)
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    return;
                }

                const serverResponse = await getUnlock.json();
                if (serverResponse.status === "UNLOCKED") {
                    setDisableEditing(true)
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 })
                    setLockPending(false)
                    toast.success("Successfully released the record!")
                } else {
                    toast.error("unable to release the lock, maybe it's already unlocked?", { position: 'top-center' })
                    setDisableEditing(true)
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    return;
                }
            } catch (error) {
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                setLockPending(false)
                toast.error("We ran into a problem, please contact tabi.")
                saveLogData({
                    module: "Releasing editing lock in customers",
                    error: error,
                    note: "Something threw an error into the catch block"
                })
            }

        }
    }

    const copyToClipboard = (type) => {
        if (type === "email") {
            // technically this one should never be empty, but in case some old data is
            if (email === "") {
                toast.warning("Nothing to copy");
                return;
            }

            setMainEmailOnClipboard(true);
            emailTimer.current = setTimeout(() => {
                setMainEmailOnClipboard(false);
            }, 3000);
            toast.success("Copied!");
            navigator.clipboard.writeText(email);
        }

        return;
    }



    // helper class for form feedback
    const customerNameClasses = customerNameHasError ? 'form-control is-invalid' : 'form-control'
    const primaryPhoneClasses = primaryPhoneHasError ? 'form-control is-invalid' : 'form-control'
    const secondaryPhoneClasses = secondaryPhoneHasError ? 'form-control is-invalid' : 'form-control'
    const faxClasses = faxHasError ? 'form-control is-invalid' : 'form-control'
    const requiredEmailClasses = emailHasError ? 'form-control is-invalid' : 'form-control'
    const websiteClasses = websiteHasError ? 'form-control is-invalid' : 'form-control'
    const customerNotesClasses = customerNotesHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressOneClasses = billingAddressOneHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressTwoClasses = billingAddressTwoHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressCityClasses = billingAddressCityHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressStateClasses = billingAddressStateHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressZipClasses = billingAddressZipHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressOneClasses = shippingAddressOneHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressTwoClasses = shippingAddressTwoHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressCityClasses = shippingAddressCityHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressStateClasses = shippingAddressStateHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressZipClasses = shippingAddressZipHasError ? 'form-control is-invalid' : 'form-control'


    return (
        <>
            {isPending && <Loading />}

            <div className="form-background mb-5 mx-auto">


                <h2 className="text-center noticaText">{customerId === undefined ? 'Add a new customer' : `Currently Viewing: ${customerName}`}</h2>


                <hr />


                <form autoComplete="off" onSubmit={formSubmissionHandler}>
                    <div className="row">

                        {/* FIRST COLUMN */}
                        <div className="col-12 col-lg-6">

                            {/* ================= CUSTOMER NAME ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Customer Name <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className={customerNameClasses} onBlur={customerNameBlur} onChange={customerNameChangeHandler} value={customerName} placeholder={"Customer Name (Required)"} autoComplete="new-password" autoFocus={true} disabled={disableEditing} />
                                    {customerNameHasError && <p className="text-danger">Name required - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= PRIMARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Primary Phone <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={primaryPhoneClasses} onBlur={primaryPhoneBlur} onChange={primaryPhoneChangeHandler} value={primaryPhone} placeholder={"Primary Phone Number (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {primaryPhoneHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>}
                                </div>
                            </div>

                            {/* ================= SECONDARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Secondary Phone <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={secondaryPhoneClasses} onBlur={secondaryPhoneBlur} onChange={secondaryPhoneChangeHandler} value={secondaryPhone} placeholder={"Secondary Phone Number (optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {secondaryPhoneHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>}
                                </div>
                            </div>

                            {/* ================= FAX NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Fax <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={faxClasses} onBlur={faxBlur} onChange={faxChangeHandler} value={fax} placeholder={"Fax Number (Optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {faxHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>}
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
                                    <input type="text" className={requiredEmailClasses} onBlur={emailBlur} onChange={emailChangeHandler} value={email} placeholder={"Email Address (Optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {emailHasError && <p className="text-danger">Invalid email - please enter in this format: info@municipal-software.com</p>}
                                </div>
                            </div>

                            {/* ================= WEBSITE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className={websiteClasses} onBlur={websiteBlur} onChange={websiteChangeHandler} value={website} placeholder={"Website (Optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {websiteHasError && <p className="text-danger">Web site required - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= NOTES FIELD ====================== */}
                            <div className="mb-3 row align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Notes</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <textarea className={customerNotesClasses} onBlur={notesBlur} onChange={customerNotesChangeHandler} rows="3" value={customerNotes} placeholder={"Notes..."} disabled={disableEditing}></textarea>
                                    {customerNotesHasError && <p className="text-danger">Allowed characters are a-z, A-Z, 0-9, spaces and dashes .</p>}
                                </div>
                            </div>
                        </div>




                        {/* SECOND COLUMN */}
                        <div className="col-12 col-lg-6">



                            {/* ================= BILLING ADDRESS 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 1 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressOneClasses} onBlur={billingAddressOneBlur} onChange={billingAddressOneChangeHandler} value={billingAddressOne} placeholder={"Address line 1 (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {billingAddressOneHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                           {/* ================= BILLING ADDRESS 2 ====================== */}
                           <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 2 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressTwoClasses} onBlur={billingAddressTwoBlur} onChange={billingAddressTwoChangeHandler} value={billingAddressTwo} placeholder={"Address line 2"} autoComplete="new-password" disabled={disableEditing} />
                                    {billingAddressTwoHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address City <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressCityClasses} onBlur={billingAddressCityBlur} onChange={billingAddressCityChangeHandler} value={billingAddressCity} placeholder={"City (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {billingAddressCityHasError && <p className="text-danger">Invalid city - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address State <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select className={billingAddressStateClasses} value={billingAddressState} onBlur={billingAddressStateBlur} onChange={billingAddressStateChangeHandler} disabled={disableEditing}>
                                        <option value={"NJ"}>New Jersey</option>
                                        <option value={"NY"}>New York</option>
                                        <option value={"PA"}>Pennsylvania</option>
                                    </select>
                                    {billingAddressStateHasError && <p className="text-danger">Something isn't right about that input.</p>}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS ZIP CODE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address Zip <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressZipClasses} onBlur={billingAddressZipBlur} onChange={billingAddressZipChangeHandler} value={billingAddressZip} placeholder={"Zip Code (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {billingAddressZipHasError && <p className="text-danger">Invalid zip - please use either this format: 11111 or this format 11111-1111</p>}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address 1 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={shippingAddressOneClasses} onBlur={shippingAddressOneBlur} onChange={shippingAddressOneChangeHandler} value={shippingAddressOne} placeholder={"Address line 1"} autoComplete="new-password" disabled={disableEditing} />
                                    {shippingAddressOneHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                           {/* ================= SHIPPING ADDRESS 2 ====================== */}
                           <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address 2 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={shippingAddressTwoClasses} onBlur={shippingAddressTwoBlur} onChange={shippingAddressTwoChangeHandler} value={shippingAddressTwo} placeholder={"Address line 2"} autoComplete="new-password" disabled={disableEditing} />
                                    {shippingAddressTwoHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address City <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={shippingAddressCityClasses} onBlur={shippingAddressCityBlur} onChange={shippingAddressCityChangeHandler} value={shippingAddressCity} placeholder={"City"} autoComplete="new-password" disabled={disableEditing} />
                                    {shippingAddressCityHasError && <p className="text-danger">Invalid city - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">State <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select className={shippingAddressStateClasses} value={shippingAddressState} onBlur={shippingAddressStateBlur} onChange={shippingAddressStateChangeHandler} disabled={disableEditing}>
                                        <option value={"NJ"}>New Jersey</option>
                                        <option value={"NY"}>New York</option>
                                        <option value={"PA"}>Pennsylvania</option>
                                    </select>
                                    {shippingAddressStateHasError && <p className="text-danger">Something isn't right about that input.</p>}
                                </div>
                            </div>

                            {/* ================= SHIPPING ADDRESS ZIP CODE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address Zip <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={shippingAddressZipClasses} onBlur={shippingAddressZipBlur} onChange={shippingAddressZipChangeHandler} value={shippingAddressZip} placeholder={"Zip Code"} autoComplete="new-password" disabled={disableEditing} />
                                    {shippingAddressZipHasError && <p className="text-danger">Invalid zip - please use either this format: 11111 or this format 11111-1111</p>}
                                </div>
                            </div>
                        </div>
                    </div>



                    <hr />



                    {/* Set of buttons for a brand new form */}
                    {formType === 'new' &&
                        <div className={"text-end"}>
                            <div>
                                {isModal && <Buttontabi buttonClass={'secondary modal-close'} title={"Close Form"} onClick={closeForm} />}
                                <Buttontabi buttonClass={'secondary'} title={"Clear Form"} onClick={clearForm} />
                                <Buttontabi type={"submit"} buttonClass={'logo'} title={!isPending ? "Save Customer" : "Submitting..."} disabled={!formIsValid} />
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

export default CustomerForm
