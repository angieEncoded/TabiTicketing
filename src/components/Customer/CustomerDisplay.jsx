import CustomerButtons from './CustomerButtons.jsx'
import CustomerBasic from './CustomerBasic.jsx'
import AddressDisplay from './AddressDisplay.jsx'
import ContactTable from './ContactTable.jsx'
import EquipmentTable from './EquipmentTable.jsx'
import LicenseTable from './LicenseTable.jsx'
import PicturesCarousel from './PicturesCarousel.jsx'
import TicketTable from './TicketTable.jsx'

const CustomerDisplay = ({ recordType, id, recordName }) => {


  return (
    <>
      <CustomerButtons recordType={recordType} id={id} recordName={recordName} />
      <CustomerBasic recordType={recordType} id={id} />
      <AddressDisplay recordType={recordType} id={id} />
      <ContactTable recordType={recordType} id={id} />
      <TicketTable recordType={recordType} id={id} />
      <EquipmentTable recordType={recordType} id={id} />
      <LicenseTable recordType={recordType} id={id} />
      <PicturesCarousel recordType={recordType} id={id} />
    </>
  )
}


export default CustomerDisplay