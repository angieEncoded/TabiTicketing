
import { useForm } from "react-hook-form"
import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Buttontabi from "../Button/Buttontabi";
import regexPatterns from "../../util/regexPatterns";
import { toast } from "react-toastify";
import LargeModal from '../Modal/LargeModal';
import CustomerDisplay from "../Customer/CustomerDisplay";
import { technicianActions } from "../../store/TechnicianSlice";

const AddTechnicianForm = () => {


  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const urls = useSelector(state => state.urls.urls);

  const dispatch = useDispatch();

  // registration for the react form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    setError,
    formState,
    formState: { errors, isValid, dirtyFields, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
  })


  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      setShowModal(true);
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

      // Post the new technicians
      const results = await fetch(urls.techniciansAPI, {
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
        toast.success(`Successfully added ${serverResponse.results.first_name}`);
        setIsPending(false);
      } else {
        setIsPending(false);
        setError("root.serverError", { type: serverResponse.status }) // prevent the form from clearing
        toast.error(`${serverResponse.status} ${serverResponse.message}`);
        return;
      }
      
    } catch (error) { // will capture if the server is down
      setIsPending(false)
      toast.error(`${serverResponse.status} ${serverResponse.message}`)
    }
  }

  const hideFormModal = () => {
    setShowModal(false);
  }

  return (

    <>

      <div className="form-background mb-5 mx-auto">
        <h2 className="text-center noticaText">Add a new Technician</h2>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row">

            {/* FIRST COLUMN */}
            <div className="col-12 col-lg-6">

              {/* ================= TECHNICIAN FIRST NAME ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="col-form-label">First Name</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register("first_name", {
                    required: true,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    className={errors.first_name && dirtyFields.first_name ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"First Name: (Required)"} autoFocus={true} />
                </div>
              </div>

              {/* ================= TECHNICIAN MIDDLE NAME ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="col-form-label">Middle</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register("middle_name", {
                    required: false,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    className={errors.middle_name && dirtyFields.middle_name ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Middle Name: (Optional)"} />
                </div>
              </div>


              {/* ================= TECHNICIAN LAST NAME ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="col-form-label">Last Name</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register("last_name", {
                    required: true,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    className={errors.last_name && dirtyFields.last_name ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Last Name: (required)"} />
                </div>
              </div>

              {/* ================= WORK EMAIL ADDRESS ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Work Email</label>
                </div>
                <div className="col-12 col-md-9">
                  <input  {...register('work_email', {
                    required: true,
                    pattern: regexPatterns.email
                  })}
                    className={errors.work_email && dirtyFields.work_email ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Work Email Address (Required)"} />
                </div>
              </div>

              {/* ================= STATUS ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Status:<span className={'text-danger'}></span></label>
                </div>
                <div className="col-12 col-md-9">
                  <select   {...register('status', {
                    required: true,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    defaultValue='Active'
                    className={errors.status && dirtyFields.status ? 'form-select is-invalid' : 'form-select'}>
                    <option value={"Active"}>Active</option>
                    <option value={"Inactive"}>Inactive</option>
                  </select>
                </div>
              </div>

              {/* ================= JOB TITLE ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="col-form-label">Job Title</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register("job_title", {
                    required: false,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    className={errors.job_title && dirtyFields.job_title ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Job Title"} />
                </div>
              </div>



            </div>


            {/* SECOND COLUMN  (or below first)*/}
            <div className="col-12 col-lg-6">





              {/* ================= WORK PHONE NUMBER ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Work Phone</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register('work_phone', {
                    required: false,
                    pattern: regexPatterns.phone
                  })}
                    className={errors.work_phone && dirtyFields.work_phone ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Format: 908-310-7603 (Optional)"} />
                </div>
              </div>

              {/* ================= EXTENSION ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Extension</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register('extension', {
                    required: false,
                    pattern: regexPatterns.extensions
                  })}
                    className={errors.extension && dirtyFields.extension ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Format: 8801 (Optional)"} />
                </div>
              </div>

              {/* ================= CELL PHONE NUMBER ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Cell Phone</label>
                </div>
                <div className="col-12 col-md-9">
                  <input {...register('cell_phone', {
                    required: false,
                    pattern: regexPatterns.phone
                  })}
                    className={errors.cell_phone && dirtyFields.cell_phone ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Format: 908-310-7603 (Required)"} />
                </div>
              </div>
              {/* ================= PERSONAL EMAIL ADDRESS ====================== */}
              <div className="mb-3 row  align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Personal Email</label>
                </div>
                <div className="col-12 col-md-9">
                  <input  {...register('personal_email', {
                    required: false,
                    pattern: regexPatterns.email
                  })}
                    className={errors.personal_email && dirtyFields.personal_email ? 'form-control is-invalid' : 'form-control'}
                    placeholder={"Personal Email Address (Optional)"} />
                </div>
              </div>

              {/* ================= NOTES FIELD ====================== */}
              <div className="mb-3 row align-items-center">
                <div className="col-12 col-md-3">
                  <label className="form-label">Notes</label>
                </div>
                <div className="col-12 col-md-9">
                  <textarea {...register('notes', {
                    required: false,
                    pattern: regexPatterns.alphaNumeric
                  })}
                    className={errors.notes && dirtyFields.notes ? 'form-control is-invalid' : 'form-control'}
                    rows="3"
                    placeholder={"Notes..."}></textarea>
                </div>
              </div>



            </div>
          </div>

          <div className={"text-end"}>
            <div>
              <Buttontabi type='button' buttonClass={'secondary'} title={"Clear Form"} onClick={() => reset()} />
              <Buttontabi type='submit' buttonClass={'logo'} title={!isPending ? "Save Technician" : "Submitting..."} disabled={!isValid} />
            </div>
          </div>
        </form>

      </div>

    </>
  )
}

export default AddTechnicianForm



