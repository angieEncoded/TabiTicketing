import CustomerButtons from './CustomerButtons.jsx'
import CustomerBasic from './CustomerBasic.jsx'
import AddressDisplay from './AddressDisplay.jsx'
import ContactTable from './ContactTable.jsx'
import EquipmentTable from './EquipmentTable.jsx'
import LicenseTable from './LicenseTable.jsx'
import PicturesCarousel from './PicturesCarousel.jsx'
import CustomerTicketTable from './CustomerTicketTable.jsx'
/* 
Pulled this out of everything, i think I have it all in state now
 recordType={recordType} id={id} 
*/


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