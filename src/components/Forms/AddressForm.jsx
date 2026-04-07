import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import usStates from '../../util/usStates.json';
import countries from '../../util/countries.json';
import { useSelector, useDispatch } from 'react-redux'
import { customersActions } from '../../store/CustomerSlice.js'


// need the id and the type for successful post to the correct endpoint
// can post to a contact, a customer, or a technician. 
// Send in the name so we don't have to fetch again for display
const AddressForm = ({ recordType, id, recordName, closeComponent, reloadData }) => {

    const [isPending, setIsPending] = useState(false);

    const urls = useSelector(state => state.urls.urls);

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
        if (formState.isSubmitSuccessful) {
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

            const results = await fetch(`${urls.addressAPI}/${recordType}/${id}`, {
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
                console.log(serverResponse)
                toast.success(`Successfully added new address with id: ${serverResponse.results.id}`);
                setIsPending(false);
                

                // Need to refresh whole database
                const customerData = await fetch(`${urls.getCustomerData}`);
                if (!customerData.ok) throw new Error("Failed to fetch customer data for background refresh. Please check the server.");
                const customerJson = await customerData.json();
                dispatch(customersActions.loadCustomerData(customerJson));


                // TODO - Need to figure out how to trigger a rerender of the address display component
                // and a background refresh of the database




                return;
            } else {
                setIsPending(false);
                toast.error(`${serverResponse.status} (Server Response)`);
                return;
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
            console.log(error)
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


                        {/* ================= ADDRESS TYPE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Address Type</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('type', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Billing' className={errors.type && dirtyFields.type ? 'form-select is-invalid' : 'form-select'}>
                                    <option key={'Billing'} value={'Billing'}>Billing</option>
                                    <option key={'Shipping'} value={'Shipping'}>Shipping</option>
                                    <option key={'Other'} value={'Other'}>Other</option>
                                </select>
                            </div>
                        </div>

                        {/* ================= STREET 2 ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Street Address 1</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('street1', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.street1 && dirtyFields.street1 ? 'form-control is-invalid' : 'form-control'} placeholder={"Street Address 1 (Required)"} />
                            </div>
                        </div>

                        {/* ================= STREET 1 ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Street Address 2</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input  {...register('street2', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.street2 && dirtyFields.street2 ? 'form-control is-invalid' : 'form-control'} placeholder={"Street Address 2 (Optional)"} />
                            </div>
                        </div>

                        {/* ================= CITY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">City</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input   {...register('city', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.city && dirtyFields.city ? 'form-control is-invalid' : 'form-control'} placeholder={"City (Required)"} />

                            </div>
                        </div>

                        {/* ================= COUNTYU ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">County</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input   {...register('county', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.county && dirtyFields.county ? 'form-control is-invalid' : 'form-control'} placeholder={"County (Optional)"} />

                            </div>
                        </div>

                        {/* ================= STATE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address State</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('state', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='NJ' className={errors.state && dirtyFields.state ? 'form-select is-invalid' : 'form-select'}>
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
                                <input {...register('zip', { required: true, pattern: regexPatterns.zip })} className={errors.zip && dirtyFields.zip ? 'form-control is-invalid' : 'form-control'} placeholder={"Zip (Required)"} />
                            </div>
                        </div>

                        {/* ================= BILLING ADDRESS COUNTRY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address Country</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select  {...register('country', { required: false, pattern: regexPatterns.alphaNumeric })} defaultValue='US' className={errors.country && dirtyFields.country ? 'form-select is-invalid' : 'form-select'}>
                                    {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className={"text-end"}>
                            <div>
                                <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                                <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                                <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Address" : "Submitting..."} disabled={!isValid} />
                            </div>
                        </div>
                    </form>
                </div>
        
        </>
    )
}

export default AddressForm