
import { useEffect, useState } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"
import { useSelector, useDispatch } from 'react-redux'

const AddressDisplay = ({ recordType, id  }) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const urls = useSelector(state => state.urls.urls);
  const selectedCustomer = useSelector(state => state.scust.customer);

  const editField = (fieldData) => {
    console.log('clicked')
  }

  return (
    <>
      {isPending && <Loading />}
      {!isPending && hasError && <ErrorAlert error={errorMessage} />}
      {!isPending && !hasError &&
        <>
          <hr></hr>
          <h5 className="text-center baskerville-font mb-3">Addresses</h5>
          {selectedCustomer.addresses.length < 1 && <p className="text-center">No Addresses recorded for this customer.</p>}

          {selectedCustomer.addresses && selectedCustomer.addresses.length >= 1 &&
            <>
              {selectedCustomer.addresses.map(address => (

                <div key={address.id}>
                  <p className={`ms-start baskerville-font mb-3 ${address.type == 'Billing' ? `text-success` : `text-tabi-logo`}  `}>{address.type}</p>
                  <div className="row">
                    <div className="col-12 col-xl-6">
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block"><strong>Street 1</strong></div>
                        <div className="col-6 col-lg-4">
                          <div>{address.street1}</div>
                        </div>
                        <div className="col-2 col-lg-4">
                          <i className="las la-edit icon-hover"></i>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">Street 2: </div>
                        <div className="col-8 col-lg-4">
                          <div>{address.street2}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">City:</div>
                        <div className="col-8 col-lg-4">
                          <div>{address.city}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">County</div>
                        <div className="col-8 col-lg-4">
                          <div>{address.county}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>

                      </div>
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">State:</div>
                        <div className="col-8 col-lg-4">
                          <div>{address.state}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">Zip:</div>
                        <div className="col-8 col-lg-4">
                          <div>{address.zip}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4 d-none d-lg-block">Country:</div>
                        <div className="col-8 col-lg-4">
                          <div>{address.country}</div>
                        </div>
                        <div className="col-2 col-lg-4"><i className="las la-edit icon-hover"></i></div>
                      </div>
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
