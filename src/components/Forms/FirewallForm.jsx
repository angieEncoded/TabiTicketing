import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedCustomerData } from "../../util/helperFunctions.js";
import urls from "../../util/apiPaths.json";

// TODO - enter this into the database and query from there, these are just examples
const purpose = [
    { "name": "Primary - Perimeter" },
    { "name": "Secondary - Internal" },
    { "name": "Failover - Perimeter" },
    { "name": "Failover - Internal" },
    { "name": "Other - see notes" },
];

const vendor = [
    { "name": "Watchguard Firebox" },
    { "name": "Watchguard Cloud" },
    { "name": "Dell Sonicwall" },
    { "name": "Cisco" },
    { "name": "Other - See Notes" }
];

const iptype = [
{"name" : "ISP DHCP Reservation"},
{"name" : "Static IP"},
{"name" : "DHCP - Dynamic Addressing"},
{"name" : "Other - See Notes"},
]


const FirewallForm = ({recordType, closeComponent}) => {

    const [isPending, setIsPending] = useState(false);
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

            const results = await fetch(`${urls.firewallAPI}/${recordType}/${selectedCustomer.id}`, {
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
                toast.success(`Successfully added a new firewall for ${selectedCustomer.customer_name}`);

                // Refresh the selected customer
                if (recordType === 'customer') {
                    const custResults = await getSelectedCustomerData(selectedCustomer.id, dispatch);
                    if (custResults.status !== 200) { toast.error(`${custResults.status} - ${custResults.message}`) }
                }

                setIsPending(false)
                return;
            } else {
                setIsPending(false);
                toast.error(`${serverResponse.status} ${serverResponse.message}`);
                return;
            }
        } catch (error) { // will capture if the server is down
            setIsPending(false)
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

                    <div className="row">

                        {/* FIRST COLUMN */}
                        <div className="col-12 col-lg-6">

                            {/* ================= ROUTER PURPOSE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Router Purpose:</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('purpose', { required: true, pattern: regexPatterns.alphaNumeric })}
                                        defaultValue='Primary - Perimeter' className={errors.purpose && dirtyFields.purpose ? 'form-select is-invalid' : 'form-select'}>
                                        {/*  NOTE TO SELF CHANGE THIS TO ID WHEN ACTUALLY PULLING FROM DB*/}
                                        {purpose.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= ROUTER STATUS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Router Status:<span className={'text-danger'}></span></label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select   {...register('status', { required: true, pattern: regexPatterns.alphaNumeric })} defaultValue='Active' className={errors.status && dirtyFields.status ? 'form-select is-invalid' : 'form-select'}>
                                        <option value={"Active"}>Active</option>
                                        <option value={"Spare"}>Powered-down Spare</option>
                                        <option value={"Decom"}>Decommissioned</option>
                                    </select>
                                </div>
                            </div>

                            {/* ================= ROUTER VENDOR ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Router Vendor</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('vendor', { required: true, pattern: regexPatterns.alphaNumeric })}
                                        defaultValue='Watchguard Firebox' className={errors.vendor && dirtyFields.vendor ? 'form-select is-invalid' : 'form-select'}>
                                        {vendor.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= ROUTER MODEL ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Model</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('model', { required: true, pattern: regexPatterns.alphaNumeric })}
                                        className={errors.model && dirtyFields.model ? 'form-control is-invalid' : 'form-control'} placeholder={"Model: (Required)"} />
                                </div>
                            </div>
                            {/* ================= SERIAL NUMBER ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Serial Number</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('serial_number', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.serial_number && dirtyFields.serial_number ? 
                                        'form-control is-invalid' : 'form-control'} placeholder={"Serial Number: (Required)"} />
                                </div>
                            </div>

                            {/* ================= FIRMWARE VERSION ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Firmware Version</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('firmware_version', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.firmware_version && dirtyFields.firmware_version ? 'form-control is-invalid' : 'form-control'} 
                                    placeholder={"Firmware Version: (Optional)"} />
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
                                    <input type="date" {...register('purchase_date', { required: false, pattern: regexPatterns.date })} className={errors.purchase_date && dirtyFields.purchase_Date ? 'form-control is-invalid' : 'form-control'} />
                                </div>
                            </div>

                            {/* =================  WARRANTY EXPIRES ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Warranty Expires</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="date" {...register('warranty_expires', { required: false, pattern: regexPatterns.date })} className={errors.warranty_expires && dirtyFields.warranty_expires ? 'form-control is-invalid' : 'form-control'} />
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

                            {/* =================  INSTALL DATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Install Date</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="date" {...register('install_date', { required: false, pattern: regexPatterns.date })} className={errors.install_date && dirtyFields.install_date ? 'form-control is-invalid' : 'form-control'} />
                                </div>
                            </div>

                            {/* ================= NOTES FIELD ====================== */}
                            <div className="mb-3 row align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Notes</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <textarea {...register('notes', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'} rows="3" placeholder={"Notes..."}></textarea>
                                </div>
                            </div>


                        </div>

                        {/* SECOND COLUMN  (or below first)*/}
                        <div className="col-12 col-lg-6">



                            {/* ================= ISP ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">ISP</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('isp', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.isp && dirtyFields.isp ? 'form-control is-invalid' : 'form-control'} placeholder={"ISP: (Optional)"} />
                                </div>
                            </div>


                            {/* ================= WEBUI ADDRESS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">WebUI Address</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('webui_address', { required: false, pattern: regexPatterns.website })} className={errors.webui_address && dirtyFields.webui_address ? 'form-control is-invalid' : 'form-control'} 
                                    placeholder={"WebUI Address: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= ISP IP Type ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">IP Type</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <select {...register('isp_ip_type', { required: true, pattern: regexPatterns.alphaNumeric })}
                                        defaultValue='' className={errors.isp_ip_type && dirtyFields.isp_ip_type ? 'form-select is-invalid' : 'form-select'}>
                                        {iptype.map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* ================= EXTERNAL IP ADDRESS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">External IP Address</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('external_ip_address', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.external_ip_address && dirtyFields.external_ip_address ? 'form-control is-invalid' : 'form-control'} 
                                    placeholder={"External IP Address: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= SUBNET MASK ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Subnet Mask</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('subnet_mask', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.subnet_mask && dirtyFields.subnet_mask ? 'form-control is-invalid' : 'form-control'} placeholder={"Subnet Mask: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= GATEWAY ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Gateway</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('gateway', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.gateway && dirtyFields.gateway ? 'form-control is-invalid' : 'form-control'} placeholder={"Gateway: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= PRIMARY DNS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Primary DNS</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('primary_dns', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.primary_dns && dirtyFields.primary_dns ? 'form-control is-invalid' : 'form-control'} placeholder={"Primary DNS: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= SECONDARY DNS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Secondary DNS</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('secondary_dns', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.secondary_dns && dirtyFields.secondary_dns ? 'form-control is-invalid' : 'form-control'} placeholder={"Secondary DNS: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= TERTIARY DNS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Tertiary DNS</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('tertiary_dns', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.tertiary_dns && dirtyFields.tertiary_dns ? 'form-control is-invalid' : 'form-control'} placeholder={"Tertiary DNS: (Optional)"} />
                                </div>
                            </div>
                            

                            {/* ================= INTERNAL IP ADDRESS ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Internal IP Address</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('internal_ip_address', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.internal_ip_address && dirtyFields.internal_ip_address ? 'form-control is-invalid' : 'form-control'} placeholder={"Internal IP Address: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= PRIMARY SUBNET ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Primary Subnet</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('primary_subnet', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.primary_subnet && dirtyFields.primary_subnet ? 'form-control is-invalid' : 'form-control'} 
                                    placeholder={"Primary Subnet: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= SECONDARY SUBNET ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Secondary Subnet</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('secondary_subnet', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.secondary_subnet && dirtyFields.secondary_subnet ? 'form-control is-invalid' : 'form-control'} 
                                    placeholder={"Secondary Subnet: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= DMZ ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">DMZ</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('dmz', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.dmz && dirtyFields.dmz ? 'form-control is-invalid' : 'form-control'} placeholder={"DMZ Subnet: (Optional)"} />
                                </div>
                            </div>

                            {/* ================= Wifi ====================== */}
                            <div className="mb-3 row  align-items-center">
                                <div className="col-12 col-md-3">
                                    <label className="form-label">Wifi</label>
                                </div>
                                <div className="col-12 col-md-9">
                                    <input {...register('wifi', { required: false, pattern: regexPatterns.alphaNumeric })} className={errors.wifi && dirtyFields.wifi ? 'form-control is-invalid' : 'form-control'} placeholder={"Wifi Subnet: (Optional)"} />
                                </div>
                            </div>

                        </div>
                    </div>





                    <div className={"text-end"}>
                        <div>
                            <Buttontabi type='button' buttonClass={'warning float-start'} title={"Cancel and close"} onClick={() => cancelTask()} />
                            <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
                            <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Firewall" : "Submitting..."} disabled={!isValid} />
                        </div>
                    </div>
                </form>
            </div>


        </>
    )
}

export default FirewallForm