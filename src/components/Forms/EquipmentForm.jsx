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

// TODO - enter this into the database and query from there, these are just examples
const equipmentType = [
  {"name" : "Desktop"},
  {"name" : "Laptop"},
  {"name" : "Router"},
  {"name" : "Server"},
  {"name" : "Switch"},
  {"name" : "Printer"},
];

const equipmentVendor = [
  { "name" :"Lenovo"}, 
  { "name" : "Dell"},
  { "name" : "Watchguard"}
];


const EquipmentForm = ({recordName, recordType, technicianId, closeComponent}) => {

    const [isPending, setIsPending] = useState(false);

    const urls = useSelector(state => state.urls.urls);
    const selectedCustomer = useSelector(state => state.scust.customer);
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

            const results = await fetch(`${urls.equipmentAPI}/${recordType}/${selectedCustomer.id}`, {
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
                toast.success(`Successfully added new equipment for ${selectedCustomer.customer_name}`);
 
                
                // Refresh the background table
                const customerData = await fetch(`${urls.getCustomerData}`);
                if (!customerData.ok) throw new Error("Failed to fetch customer data for background refresh. Please refresh the system.");
                const customerJson = await customerData.json();
                dispatch(customersActions.loadCustomerData(customerJson));


                // Refresh the selected customer as well if customer
                if(recordType === 'customer'){
                    const selectedCustomerData = await fetch(`${urls.getCustomerData}/${selectedCustomer.id}`);
                    if (!selectedCustomerData.ok) throw new Error("Failed to fetch customer data. Please refresh the system.");
                    const selectedCustomerJson = await selectedCustomerData.json();
                    dispatch(selectedCustomerActions.loadCustomerData(selectedCustomerJson));
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


                        {/* ================= EQUIPMENT TYPE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Equipment Type</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('equipment_type', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Laptop' className={errors.equipment_type && dirtyFields.equipment_type ? 'form-select is-invalid' : 'form-select'}>
                                  {/*  NOTE TO SELF CHANGE THIS TO ID WHEN ACTUALLY PULLING FROM DB*/}
                                   {equipmentType.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
                                </select>
                            </div>
                        </div>


                        {/* ================= EQUIPMENT VENDOR ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Equipment Vendor</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <select {...register('vendor', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Laptop' className={errors.vendor && dirtyFields.vendor ? 'form-select is-invalid' : 'form-select'}>
                                   {equipmentVendor.map(vendor => <option key={vendor.name} value={vendor.name}>{vendor.name}</option>)}
                                </select>
                            </div>
                        </div>


                        {/* ================= Model ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Model</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('model', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.model && dirtyFields.model ? 'form-control is-invalid' : 'form-control'} placeholder={"Model (optional)"} />
                            </div>
                        </div>


                        {/* ================= OS Version ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">OS Version</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('os_version', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.os_version && dirtyFields.os_version ? 'form-control is-invalid' : 'form-control'} placeholder={"(Optional)"} />
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

export default EquipmentForm