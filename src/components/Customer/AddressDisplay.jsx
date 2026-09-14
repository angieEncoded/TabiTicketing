import { useEffect, useState, useRef } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { useSelector, useDispatch } from 'react-redux'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { getSelectedCustomerData, getAllCustomers } from "../../util/helperFunctions";
import { toast } from 'react-toastify';
import Buttontabi from '../Button/Buttontabi';
import { useForm } from "react-hook-form"
import regexPatterns from '../../util/regexPatterns';
import urls from "../../util/apiPaths.json";
import usStates from '../../util/usStates.json';
import countries from '../../util/countries.json';

const AddressDisplay = ({ recordType, id }) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const [editingField, setEditingField] = useState("empty");

  const selectedCustomer = useSelector(state => state.scust.customer);

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



  // const copyToClipboard = (type, value) => {

  //   if (value === "" || value == null) {
  //     toast.warning("Nothing to copy");
  //     return;
  //   }

  //   if (type === "Email") { setClipboard("Email") }
  //   if (type === "Phone") { setClipboard("Phone") }
  //   if (type === "Phone2") { setClipboard("Phone2") }
  //   if (type === "Website") { setClipboard("Website") }
  //   if (type === "vpn_endpoint") { setClipboard("vpn_endpoint") }

  //   clipTimer.current = setTimeout(() => {
  //     setClipboard(false);
  //   }, 3000);
  //   toast.success("Copied!");
  //   navigator.clipboard.writeText(value);

  //   return;
  // }



  const onSubmit = async (formData) => {

    setIsPending(true); // invoke spinner

    const addressId = formData.id;

    // clean the id back out of the structure
    const { id, ...cleanedData } = formData;

    const formPost = {
      ...cleanedData,
      added_by: 'SYSTEM',
      updated_by: 'SYSTEM'
    }


    try {
      const results = await fetch(`${urls.addressAPI}/${formData.id}`, {
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
        toast.success(`Successfully updated the address.`);

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
          <hr></hr>
          <h5 className="text-center baskerville-font mb-3">Addresses</h5>
          {selectedCustomer?.addresses && selectedCustomer.addresses?.length < 1 && <p className="text-center">No Addresses recorded for this customer.</p>}

          {selectedCustomer?.addresses && selectedCustomer.addresses?.length >= 1 &&
            <>
              {selectedCustomer.addresses.map(address => (

                <div key={address.id}>
                  <p className={`ms-start baskerville-font mb-3 ${address.type == 'Billing' ? `text-success` : `text-tabi-logo`}  `}>{address.type}</p>
                  <div className="row">
                    <div className="col-12 col-xl-6">



                      {editingField && editingField === "street1" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= STREET 1 ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">Street 1</label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input {...register("street1", { required: true, pattern: regexPatterns.alphaNumeric })}
                                  className={errors.street1 && dirtyFields.street1 ? 'form-control is-invalid' : 'form-control'}
                                  placeholder={"Street 1 (Required)"}
                                  autoFocus={true}
                                  defaultValue={address.street1} />
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">Street 1</div>
                          <div className="col-lg-7">
                            <div>{address.street1}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("street1")}></i>
                          </div>
                        </div>
                      }









                      {editingField && editingField === "street2" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= STREET 2 ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">Street 2</label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input {...register("street2", { required: false, pattern: regexPatterns.alphaNumeric })}
                                  className={errors.street2 && dirtyFields.street2 ? 'form-control is-invalid' : 'form-control'}
                                  placeholder={"Street 2 (Optional)"}
                                  autoFocus={true}
                                  defaultValue={address.street2} />
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">Street 2</div>
                          <div className="col-lg-7">
                            <div>{address.street2}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("street2")}></i>
                          </div>
                        </div>
                      }


                      {editingField && editingField === "city" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= CITY ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">City</label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input {...register("city", { required: true, pattern: regexPatterns.alphaNumeric })}
                                  className={errors.city && dirtyFields.city ? 'form-control is-invalid' : 'form-control'}
                                  placeholder={"City (Required)"}
                                  autoFocus={true}
                                  defaultValue={address.city} />
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">City</div>
                          <div className="col-lg-7">
                            <div>{address.city}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("city")}></i>
                          </div>
                        </div>
                      }
                    </div>










                    <div className="col-12 col-xl-6">


                      {editingField && editingField === "county" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= COUNTY ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">County</label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input {...register("county", { required: false, pattern: regexPatterns.alphaNumeric })}
                                  className={errors.county && dirtyFields.county ? 'form-control is-invalid' : 'form-control'}
                                  placeholder={"County (Optional)"}
                                  autoFocus={true}
                                  defaultValue={address.county} />
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">County</div>
                          <div className="col-lg-7">
                            <div>{address.county}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("county")}></i>
                          </div>
                        </div>
                      }



                      {editingField && editingField === "state" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= STATE ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">State</label>
                              </div>
                              <div className="col-12 col-md-9">
                                  <select {...register('state', { required: true, pattern: regexPatterns.alphaNumeric })} 
                                  defaultValue={address.state} className={errors.state && dirtyFields.state ? 'form-select is-invalid' : 'form-select'}>
                                    {usStates.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)}
                                </select>
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">State</div>
                          <div className="col-lg-7">
                            <div>{address.state}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("state")}></i>
                          </div>
                        </div>
                      }









                      {editingField && editingField === "zip" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= ZIP ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">Zip</label>
                              </div>
                              <div className="col-12 col-md-9">
                                <input {...register('zip', { required: true, pattern: regexPatterns.zip })} 
                                className={errors.zip && dirtyFields.zip ? 'form-control is-invalid' : 'form-control'} 
                                placeholder={"Zip (Required)"} 
                                defaultValue={address.zip}/>

                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">Zip</div>
                          <div className="col-lg-7">
                            <div>{address.zip}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("zip")}></i>
                          </div>
                        </div>
                      }


                      {editingField && editingField === "country" ?
                        <div className="row mb-3">
                          <form onSubmit={handleSubmit(onSubmit)}>

                            {/* ================= COUNTRY ====================== */}
                            <div className="mb-3 row  align-items-center">
                              <div className="col-12 col-md-3">
                                <label className="col-form-label">Country</label>
                              </div>
                              <div className="col-12 col-md-9">
                                   <select  {...register('country', { required: false, pattern: regexPatterns.alphaNumeric })} 
                                   defaultValue={address.country} className={errors.country && dirtyFields.country ? 'form-select is-invalid' : 'form-select'}>
                                    {countries.map(country => <option key={country.name} value={country.abbreviation}>{country.name}</option>)}
                                </select>
                              </div>
                              <input type='hidden' {...register("id")} defaultValue={address.id} />
                            </div>

                            <div className="float-end">
                              <Buttontabi type='button' buttonClass={'secondary btn-sm'} title={"Cancel"} onClick={swapToNormalField} />
                              <Buttontabi type='submit' buttonClass={'logo btn-sm'} title={!isPending ? "Save Edit" : "Submitting..."} />
                            </div>
                          </form>
                        </div>
                        :
                        <div className="row mb-2">
                          <div className="col-lg-4 d-none d-lg-block">Country</div>
                          <div className="col-lg-7">
                            <div>{address.country}</div>
                          </div>
                          <div className="col-lg-1">
                            <i className="las la-edit icon-hover" onClick={() => swapToEditField("country")}></i>
                          </div>
                        </div>
                      }










                    </div>
                  </div>
                </div>


              ))}
            </>
          }
        </>
      }
    </>
  )
}

export default AddressDisplay
