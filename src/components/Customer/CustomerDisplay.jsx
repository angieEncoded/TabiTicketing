import CustomerButtons from './CustomerButtons.jsx'
import CustomerBasic from './CustomerBasic.jsx'
import AddressDisplay from './AddressDisplay.jsx'
import ContactTable from '../Tables/ContactTable.jsx'
import EquipmentTable from '../Tables/EquipmentTable.jsx'
import LicenseTable from '../Tables/LicenseTable.jsx'
import PicturesCarousel from './PicturesCarousel.jsx'
import CustomerTicketTable from '../Tables/CustomerTicketTable.jsx'

const CustomerDisplay = ({handleRowClick}) => {

  return (
    <>
      <CustomerBasic/>
      <AddressDisplay/>
      <ContactTable/>
      <CustomerTicketTable handleRowClick={handleRowClick}/>
      <EquipmentTable/>
      <LicenseTable/>
      <PicturesCarousel/>
    </>
  )
}


export default CustomerDisplay