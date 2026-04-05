import CustomerButtons from './CustomerButtons.jsx'
import CustomerBasic from './CustomerBasic.jsx'
import AddressDisplay from './AddressDisplay.jsx'
import ContactDisplay from './ContactDisplay.jsx'
import EquipmentDisplay from './EquipmentDisplay.jsx'
import LicenseDisplay from './LicenseDisplay.jsx'
import PicturesDisplay from './PicturesDisplay.jsx'
import TicketDisplay from './TicketDisplay.jsx'

const CustomerDisplay = ({ recordType, id }) => {

  return (
    <>
          <CustomerButtons />
          <CustomerBasic  recordType={recordType} id={id}/>
          <AddressDisplay recordType={recordType} id={id}/>
          <ContactDisplay recordType={recordType} id={id}/>
          <TicketDisplay  recordType={recordType} id={id}/>
          <EquipmentDisplay  recordType={recordType} id={id}/>
          <LicenseDisplay  recordType={recordType} id={id}/>
          <PicturesDisplay  recordType={recordType} id={id}/>
    </>
  )
}


export default CustomerDisplay