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
import { getTableData, getSelectedCustomerData } from "../../util/helperFunctions.js";

const LicenseForm = ({recordType, closeComponent}) => {

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
        setError,
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

    const onSubmit = async (data) => {

      setIsPending(true); // invoke our spinner

      const formData = new FormData();  
      formData.append('product_name', data.product_name);
      formData.append('vendor_name', data.vendor_name);
      formData.append('sold_date', data.sold_date);
      formData.append('purchase_date', data.purchase_date);
      formData.append('expires', data.expires);
      formData.append('license_key', data.license_key);
      formData.append('email_of_record', data.email_of_record);
      formData.append('end_of_life', data.end_of_life);
      formData.append('notes', data.notes);
      formData.append('added_by', 'SYSTEM');
      formData.append('updated_by', 'SYSTEM');
      formData.append('customer_name', selectedCustomer.customer_name)

      if (data.license_file && data.license_file[0]){
        formData.append("license_file", data.license_file[0]);
      }


        try {

            const results = await fetch(`${urls.licenseAPI}/${recordType}/${selectedCustomer.id}`, {
                method: "POST",
                body: formData
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
                toast.success(`Successfully added a new license for ${selectedCustomer.customer_name}`);

                // Refresh the selected customer
                if(recordType === 'customer'){
                    const custResults = await getSelectedCustomerData(`${urls.customerAPI}/${selectedCustomer.id}`, dispatch);
                    if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
                } 

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

    const cancelTask = () => {
        reset();
        closeComponent();
    }






    
  return (
      <>
                <div className="form-background mb-5 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* ================= PRODUCT NAME ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Product Name</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('product_name', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.product_name && dirtyFields.product_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Product Name: (Required)"} />
                            </div>
                        </div>

                        {/* ================= VENDOR NAME ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Vendor Name</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('vendor_name', { required: true, pattern: regexPatterns.alphaNumeric })} className={errors.vendor_name && dirtyFields.vendor_name ? 'form-control is-invalid' : 'form-control'} placeholder={"Vendor Name: (Required)"} />
                            </div>
                        </div>

                        {/* =================  SOLD DATE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Sold Date</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="date" {...register('sold_date', { required: false, pattern: regexPatterns.date })} className={errors.sold_date && dirtyFields.sold_date ? 'form-control is-invalid' : 'form-control'} />
                            </div>
                        </div>

                        {/* =================  PURCHASE DATE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Purchase Date</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="date" {...register('purchase_date', { required: false, pattern: regexPatterns.date })} className={errors.purchase_date && dirtyFields.purchase_Date ? 'form-control is-invalid' : 'form-control'}/>
                            </div>
                        </div>
 
                        {/* =================  EXPIRES ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Expires</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="date" {...register('expires', { required: false, pattern: regexPatterns.date })} className={errors.expires && dirtyFields.expires ? 'form-control is-invalid' : 'form-control'}/>
                            </div>
                        </div>

                        {/* ================= LICENSE KEY ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">License Key</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input {...register('license_key', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.license_key && dirtyFields.license_key ? 'form-control is-invalid' : 'form-control'} placeholder={"License Key: (Optional)"} />
                            </div>
                        </div> 

                        {/* ================= LICENSE FILE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">License File</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type='file' {...register('license_file', { required: false })} className={errors.license_file && dirtyFields.license_file ? 'form-control is-invalid' : 'form-control'} placeholder={"License Key: (Optional)"} />
                            </div>
                        </div> 

                        {/* ================= EMAIL OF RECORD ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">
                                    Email 
                                </label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input  {...register('email_of_record', { required: false, pattern: regexPatterns.email_of_record })} className={errors.email_of_record  && dirtyFields.email ? 'form-control is-invalid' : 'form-control'} placeholder={"Email of Record (Optional)"} />
                            </div>
                        </div>

                        {/* =================  END OF LIFE DATE ====================== */}
                        <div className="mb-3 row  align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">End of Life</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <input type="date" {...register('end_of_life', { required: false, pattern: regexPatterns.date })} className={errors.end_of_life && dirtyFields.end_of_life ? 'form-control is-invalid' : 'form-control'} />
                            </div>
                        </div>

                        {/* ================= NOTES FIELD ====================== */}
                        <div className="mb-3 row align-items-center">
                            <div className="col-12 col-md-3">
                                <label className="form-label">Notes</label>
                            </div>
                            <div className="col-12 col-md-9">
                                <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.notes && dirtyFields.notes    ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."}></textarea>
                            </div>
                        </div>


                        <div className={"text-end"}>
                            <div>
                                <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                                <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                                <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save License" : "Submitting..."} disabled={!isValid} />
                            </div>
                        </div>
                    </form>
                </div>
        
        </>
  )
}

export default LicenseForm