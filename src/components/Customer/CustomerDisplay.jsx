import React, { useEffect, useState } from 'react'
import Loading from '../LoadingScreens/Loading.jsx'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import CustomerButtons from './CustomerButtons.jsx'
import CustomerBasic from './CustomerBasic.jsx'
import AddressDisplay from './AddressDisplay.jsx'
import ContactDisplay from './ContactDisplay.jsx'
import EquipmentDisplay from './EquipmentDisplay.jsx'
import LicenseDisplay from './LicenseDisplay.jsx'
import PicturesDisplay from './PicturesDisplay.jsx'


const CustomerDisplay = ({ recordType, id }) => {

  const [isPending, setIsPending] = useState(false);


  return (
    <>


          <CustomerButtons />
          <CustomerBasic  recordType={recordType} id={id}/>
          <AddressDisplay recordType={recordType} id={id}/>
          <ContactDisplay />
          <EquipmentDisplay />
          <LicenseDisplay />
          <PicturesDisplay />

    </>
  )
}


export default CustomerDisplay