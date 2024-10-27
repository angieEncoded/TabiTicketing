import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
const Testing =  () => {
  
    const urls = useSelector(state => state.urls.urls);

    const getData = async() => {
        const savedCustomerRecord = await fetch(`${urls.getCustomerById}1010`)
        console.log(savedCustomerRecord)
        const results = await savedCustomerRecord.json();
        console.log(results)


    }


    
  
    return (

        <>
            <button onClick={getData}>Get id1000</button>


        </>



        

)




    

}



export default Testing