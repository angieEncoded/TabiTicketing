import React, { useEffect, useState } from 'react';
import {
    requiredAddressCheck, requiredNameCheck, requiredZipCheck, requiredCityStateCheck, requiredPhoneCheck, optionalAddressCheck,
    optionalTextcheck, optionalPhoneCheck, optionalEmailCheck, optionalCityStateCheck, optionalZipCheck,
    optionalWebsiteCheck
} from "../../util/regExCheckers"; // Import my regex checker functions
import { formatRemainingSeconds } from "../../util/helperFunctions"
import Buttontabi from "../Button/Buttontabi";
import Loading from '../LoadingScreens/Loading';
import LoadingSmallLight from "../LoadingScreens/LoadingSmall"
import useInput from '../../hooks/useInput';
import useSelect from "../../hooks/useSelect"
import { toast } from "react-toastify";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usStates from "../../util/usStates.json";
import countries from "../../util/countries.json";
import { customersActions } from '../../store/CustomerSlice';


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
    const dispatch = useDispatch();

    useEffect(() => {

        // unmount callback to clean up some timer stuff
        return () => {
            if (emailTimer.current != null) {
                window.clearTimeout(emailTimer)
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

        // cleanup the interval on unmount if the user decided to just close it up
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

    // CUSTOMER NAME HANDLER
    // ================================================
    const { value: county,
        valueIsValid: countyIsValid,
        hasError: countyHasError,
        resetInput: resetCountyInput,
        valueChangeHandler: countyChangeHandler,
        initialValueHandler: setCounty,
        valueBlurHandler: countyBlur
    } = useInput(optionalCityStateCheck);

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
    } = useInput(optionalWebsiteCheck);

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

    // CUSTOMER STATUS HANDLER
    // ================================================
    const { value: customerStatus,
        valueIsValid: customerStatusIsValid,
        hasError: customerStatusHasError,
        resetInput: resetCustomerStatusInput,
        valueChangeHandler: customerStatusChangeHandler,
        initialValueHandler: setCustomerStatus,
        valueBlurHandler: customerStatusBlur
    } = useSelect(requiredCityStateCheck, "Active");

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
    } = useSelect(requiredCityStateCheck, "NJ");

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

    // CUSTOMER BILLING COUNTRY ONE HANDLER
    // ================================================
    const { value: billingAddressCountry,
        valueIsValid: billingAddressCountryIsValid,
        hasError: billingAddressCountryHasError,
        resetInput: resetBillingAddressCountryInput,
        valueChangeHandler: billingAddressCountryChangeHandler,
        initialValueHandler: setBillingAddressCountry,
        valueBlurHandler: billingAddressCountryBlur
    } = useInput(requiredCityStateCheck, "US");

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
    } = useSelect(optionalCityStateCheck, "NJ");

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

    // CUSTOMER SHIPPING COUNTRY ONE HANDLER
    // ================================================
    const { value: shippingAddressCountry,
        valueIsValid: shippingAddressCountryIsValid,
        hasError: shippingAddressCountryHasError,
        resetInput: resetShippingAddressCountryInput,
        valueChangeHandler: shippingAddressCountryChangeHandler,
        initialValueHandler: setShippingAddressCountry,
        valueBlurHandler: shippingAddressCountryBlur
    } = useInput(requiredCityStateCheck, "US");

    // Helper function to clear all the inputs at once
    const clearForm = () => {
        resetCustomerNameInput();
        resetprimaryPhoneInput();
        resetSecondaryPhoneInput();
        resetFaxInput();
        resetEmailInput();
        resetWebsiteInput();
        resetCountyInput();
        resetCustomerNotesInput();
        resetCustomerStatusInput();
        resetBillingAddressOneInput();
        resetBillingAddressTwoInput();
        resetBillingAddressCityInput();
        resetBillingAddressStateInput();
        resetBillingAddressZipInput();
        resetBillingAddressCountryInput();
        resetShippingAddressOneInput();
        resetShippingAddressTwoInput();
        resetShippingAddressCityInput();
        resetShippingAddressStateInput();
        resetShippingAddressZipInput();
        resetShippingAddressCountryInput();
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
        setCustomerStatus(incomingData.status);
        setBillingAddressOne(incomingData.billing_address_one);
        setBillingAddressTwo(incomingData.billing_address_two);
        setBillingAddressCity(incomingData.billing_address_city);
        setBillingAddressState(incomingData.billing_address_state);
        setBillingAddressZip(incomingData.billing_address_zip);
        setBillingAddressCountry(incomingData.billingAddressCountry);
        setShippingAddressOne(incomingData.shipping_address_one);
        setShippingAddressTwo(incomingData.shipping_address_two);
        setShippingAddressCity(incomingData.shipping_address_city);
        setShippingAddressState(incomingData.shipping_address_state);
        setShippingAddressZip(incomingData.shipping_address_zip);
        setShippingAddressCountry(incomingData.shippingAddressCountry);
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
        websiteIsValid &&
        emailIsValid &&
        customerNotesIsValid &&
        customerStatusIsValid &&
        countyIsValid &&
        billingAddressOneIsValid &&
        billingAddressTwoIsValid &&
        billingAddressCityIsValid &&
        billingAddressStateIsValid &&
        billingAddressZipIsValid &&
        billingAddressCountryIsValid &&
        shippingAddressOneIsValid &&
        shippingAddressTwoIsValid &&
        shippingAddressCityIsValid &&
        shippingAddressStateIsValid &&
        shippingAddresszipIsValid &&
        shippingAddressCountryIsValid

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
            status: customerStatus,
            county: county,
            billing_one: billingAddressOne,
            billing_two: billingAddressTwo,
            billing_city: billingAddressCity,
            billing_state: billingAddressState,
            billing_zip: billingAddressZip,
            billing_country: "US",
            shipping_one: shippingAddressOne,
            shipping_two: shippingAddressTwo,
            shipping_city: shippingAddressCity,
            shipping_state: shippingAddressState,
            shipping_zip: shippingAddressZip,
            shipping_country: "US",
        }

        // SAVE NEW RECORD
        //=================================================================================
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
                setIsPending(false)
                toast.error(`${results.error}`)
                return;
            }

            const serverResponse = await results.json()

            if (serverResponse.status === "200") {

                toast.success(`Successfully added new customer with id: ${serverResponse.id}`)

                // request the entire new record from the database
                const savedCustomerRecord = await fetch(`${urls.getCustomerById}${serverResponse.id}`)
                if (!savedCustomerRecord.ok) {
                    toast.error(`${serverResponse.error} (Server Response)`)
                    setIsPending(false)
                    return;
                }

                const savedCustomerRecordJson = await savedCustomerRecord.json();

                // Populate everything we need to for editing the customer
                setDisableEditing(true);
                prePopulateForm(savedCustomerRecordJson)
                setCustomerId(serverResponse.id)
                setFormType("edit");

                // finally we are done and can render the component
                setIsPending(false)
                return;
            } else {
                setIsPending(false)
                toast.error(`${serverResponse.error} (Server Response)`)
                return;
            }
        } catch (error) {
            setIsPending(false)
            toast.error(`Did not get a response from the server, please call tabi`)
        }
    }

    // Handle getting and releasing the record lock
    const handleGettingEditLock = async (requestType) => {

        if (requestType === "edit") {
            try {
                // Set our pending state and clear any intervals
                setLockPending(true)
                if (countdownId) { clearInterval(countdownId) }
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
                setDisableEditing(false)
                setLockPending(false)
                toast.success("Successfully locked the record!")
            } catch (error) {
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                setLockPending(false)
                toast.error("We ran into a problem, please contact tabi.")
            }
        }

        if (requestType === "cancelEdit") {
            try {
                setLockPending(true)
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 })
                setLockPending(false)
                toast.success("Successfully released the record!")

            } catch (error) {
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                setLockPending(false)
                toast.error("We ran into a problem, please contact tabi.")

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
    const countyClasses = countyHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressCountryClasses = billingAddressCountryHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressCountryClasses = shippingAddressCountryHasError ? 'form-control is-invalid' : 'form-control'
    const requiredEmailClasses = emailHasError ? 'form-control is-invalid' : 'form-control'
    const websiteClasses = websiteHasError ? 'form-control is-invalid' : 'form-control'
    const customerNotesClasses = customerNotesHasError ? 'form-control is-invalid' : 'form-control'
    const customerStatusClasses = customerStatusHasError ? 'form-select is-invalid' : 'form-select'
    const billingAddressOneClasses = billingAddressOneHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressTwoClasses = billingAddressTwoHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressCityClasses = billingAddressCityHasError ? 'form-control is-invalid' : 'form-control'
    const billingAddressStateClasses = billingAddressStateHasError ? 'form-select is-invalid' : 'form-select'
    const billingAddressZipClasses = billingAddressZipHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressOneClasses = shippingAddressOneHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressTwoClasses = shippingAddressTwoHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressCityClasses = shippingAddressCityHasError ? 'form-control is-invalid' : 'form-control'
    const shippingAddressStateClasses = shippingAddressStateHasError ? 'form-select is-invalid' : 'form-select'
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
                                    {/* {customerNameHasError && <p className="text-danger">Name required - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
                                </div>
                            </div>

                            {/* ================= PRIMARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Primary Phone <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={primaryPhoneClasses} onBlur={primaryPhoneBlur} onChange={primaryPhoneChangeHandler} value={primaryPhone} placeholder={"Primary Phone Number (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {primaryPhoneHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 1 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressOneClasses} onBlur={billingAddressOneBlur} onChange={billingAddressOneChangeHandler} value={billingAddressOne} placeholder={"Address line 1 (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {billingAddressOneHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
                                </div>
                            </div>


                           {/* ================= BILLING ADDRESS 2 ====================== */}
                           <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address 2 <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressTwoClasses} onBlur={billingAddressTwoBlur} onChange={billingAddressTwoChangeHandler} value={billingAddressTwo} placeholder={"Address line 2"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {billingAddressTwoHasError && <p className="text-danger">Invalid address - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
                                </div>
                            </div>


                            {/* ================= BILLING ADDRESS CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address City <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressCityClasses} onBlur={billingAddressCityBlur} onChange={billingAddressCityChangeHandler} value={billingAddressCity} placeholder={"City (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {billingAddressCityHasError && <p className="text-danger">Invalid city - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
                                </div>
                            </div>


                            {/* ================= BILLING ADDRESS STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address State <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select className={billingAddressStateClasses} value={billingAddressState} onBlur={billingAddressStateBlur} onChange={billingAddressStateChangeHandler} disabled={disableEditing}>
                                        {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
                                    </select>
                                    {/* {billingAddressStateHasError && <p className="text-danger">Something isn't right about that input.</p>} */}
                                </div>
                            </div>

                            {/* ================= BILLING ADDRESS ZIP CODE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Billing Address Zip <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={billingAddressZipClasses} onBlur={billingAddressZipBlur} onChange={billingAddressZipChangeHandler} value={billingAddressZip} placeholder={"Zip Code (Required)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {billingAddressZipHasError && <p className="text-danger">Invalid zip - please use either this format: 11111 or this format 11111-1111</p>} */}
                                </div>
                            </div>


                            {/* ================= NOTES FIELD ====================== */}
                            <div className="mb-3 row align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Notes</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <textarea className={customerNotesClasses} onBlur={notesBlur} onChange={customerNotesChangeHandler} rows="3" value={customerNotes} placeholder={"Notes..."} disabled={disableEditing}></textarea>
                                    {/* {customerNotesHasError && <p className="text-danger">Allowed characters are a-z, A-Z, 0-9, spaces and dashes .</p>} */}
                                </div>
                            </div>

                            {/* ================= CUSTOMER STATUS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Customer Status:<span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select className={customerStatusClasses} value={customerStatus} onBlur={customerStatusBlur} onChange={customerStatusChangeHandler} disabled={disableEditing}>
                                        <option value={"Active"}>Active</option>
                                        <option value={"Inactive"}>Inactive</option>
                                        <option value={"Issue"}>Issue</option>
                                    </select>
                                    {customerStatusHasError && <p className="text-danger">Something isn't right about that input.</p>}
                                </div>
                            </div>



                        </div>









                        {/* SECOND COLUMN */}
                        <div className="col-12 col-lg-6">


                            {/* ================= COUNTY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">County<span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className={countyClasses} onBlur={countyBlur} onChange={countyChangeHandler} value={county} placeholder={"County (Optional)"} disabled={disableEditing} />
                                    {/* {countyHasError && <p className="text-danger">County required - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
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
                                        {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
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


                            {/* ================= SHIPPING ADDRESS COUNTRY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Shipping Address Country <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select className={shippingAddressCountryClasses} value={shippingAddressCountry} onBlur={shippingAddressCountryBlur} onChange={shippingAddressCountryChangeHandler} disabled={disableEditing}>
                                        {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                    </select>
                                    {/* {billingAddressStateHasError && <p className="text-danger">Something isn't right about that input.</p>} */}
                                </div>
                            </div>


                            
                            {/* ================= SECONDARY PHONE NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Secondary Phone <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={secondaryPhoneClasses} onBlur={secondaryPhoneBlur} onChange={secondaryPhoneChangeHandler} value={secondaryPhone} placeholder={"Secondary Phone Number (optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {secondaryPhoneHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>} */}
                                </div>
                            </div>

                            {/* ================= FAX NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Fax <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="text" className={faxClasses} onBlur={faxBlur} onChange={faxChangeHandler} value={fax} placeholder={"Fax Number (Optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {faxHasError && <p className="text-danger">Invalid phone - Format: 111-111-1111 or 1112223333</p>} */}
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
                                    {/* {emailHasError && <p className="text-danger">Invalid email - please enter in this format: info@municipal-software.com</p>} */}
                                </div>
                            </div>

                            {/* ================= WEBSITE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="col-form-label">Website <span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className={websiteClasses} onBlur={websiteBlur} onChange={websiteChangeHandler} value={website} placeholder={"Website (Optional)"} autoComplete="new-password" disabled={disableEditing} />
                                    {/* {websiteHasError && <p className="text-danger">Web site required - allowed characters are a-z, A-Z, 0-9, spaces and dashes </p>} */}
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
