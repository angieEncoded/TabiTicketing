
import React, { useEffect, useState } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

const AddressDisplay = ({ recordType = 'customer', id = 1 }) => {

  const [isPending, setIsPending] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState(false);
  console.log(selectedAddressData)
  const urls = useSelector(state => state.urls.urls);

  const editField = (fieldData) => {
    console.log('clicked')
  }

  // Initially populate the data
  useEffect(() => {
    const getCustomerData = async () => {
      try {
        setIsPending(true);
        const addressData = await fetch(`${urls.getAddressData}/${recordType}/${id}`);
        if (!addressData.ok) throw new Error("Failed to fetch customer data. Please check the server.");
        const addressJson = await addressData.json();
        setSelectedAddressData(addressJson);
      } catch (error) {
        setIsPending(false);
        toast.error(error.message);
      }
    }
    getCustomerData();
    setIsPending(false);
  }, []);

  return (
    <>

      {!isPending &&
        <>
          <h5 className="text-center baskerville-font mb-3">Addresses</h5>
          {selectedAddressData.length < 1 && <p className="text-center">No Addresses recorded for this customer.</p>}

          {selectedAddressData && selectedAddressData.length > 1 &&
            <>
              {selectedAddressData.map(address => (
                <>

                <p className={`ms-start baskerville-font mb-3 ${address.type =='Billing' ? `text-success` : `text-dark`}  `}>{address.type}</p>

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
                </>
              ))}
            </>
          }
        </>
      }
    </>
  )
}

export default AddressDisplay
