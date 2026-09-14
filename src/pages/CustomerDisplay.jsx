import { default as CustomerDisplayComponent } from '../components/Customer/CustomerDisplay'



const CustomerDisplay = ({ recordType, id, recordName }) => {

  return (

    <>
      <CustomerDisplayComponent recordName={recordName} recordType={recordType} id={id}></CustomerDisplayComponent>
    </>
  )
}

export default CustomerDisplay