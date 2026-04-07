import AddressForm from "../components/Forms/AddressForm"

const closeComponent = () => {
    // console.log('yay')
}

const Testing = () => {



    return (
       <>
       
       <AddressForm recordType={'customer'} id={1} closeComponent={closeComponent} />
       
       
       </>
          
    )
}



export default Testing