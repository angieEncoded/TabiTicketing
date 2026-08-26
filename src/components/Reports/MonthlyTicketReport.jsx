import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import regexPatterns from '../../util/regexPatterns';
import Buttontabi from '../Button/Buttontabi';
import { getAllCustomers }  from "../../util/helperFunctions"

const MonthlyTicketReport = ({closeComponent}) => {

    const [isPending, setIsPending] = useState(false);

    const customers = useSelector(state => state.cust.customers);

    // Initially populate the data
    useEffect(() => {
        // Wrap in an async
        const getData = async() => {
            try {
                setIsPending(true)
                const results = await getAllCustomers(dispatch); // reach out to the helper function
                if(results.status === 200){
                    setIsPending(false);
                } else {
                    setIsPending(false);
                    toast.error(`${results.status} ${results.message}`)
                }
            } catch (error) {
                setIsPending(false);
                toast.error(error);
            }
        }
        getData();
    }, []);


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

            const results = await fetch(`${urls.addressAPI}/${recordType}/${selectedCustomer.id}`, {
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
                toast.success(`Successfully added new address for ${selectedCustomer.customer_name}`);
             
                // Refresh the background table
                const tableResults = await getAllCustomers(dispatch);
                if (tableResults.status !== 200) { toast.error(`${tableResults.status} - ${tableResults.message}`) }

                // Refresh the selected customer as well if customer
                if(recordType === 'customer'){
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


                        {/* ================= ADDRESS TYPE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Address Type</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('type', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Billing' className={errors.type && dirtyFields.type ? 'form-select is-invalid' : 'form-select'}>
                                    {customers.map(customer => <option key={customer.customer_name} value={customer.customer_name}>{customer.customer_name}</option>)}
                                </select>
                            </div>
                        </div>

                        <label for="exampleDataList" class="form-label">Datalist example</label>



                        {/* ================= BILLING ADDRESS COUNTRY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Billing Address Country</label>
                            </div>
                            <div className="col-12 col-md-9">
                                
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

export default MonthlyTicketReport