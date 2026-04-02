import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Testing = () => {

    //const [customerresults, setcustomerresults] = useState();


    const urls = useSelector(state => state.urls.urls);
    console.log(urls);
    const selectid = 100;
    const getData = async () => {
        const savedCustomerRecord = await fetch(`${urls.getCustomerById}${selectid}`)
        console.log(savedCustomerRecord)
        const results = await savedCustomerRecord.json();
        // setcustomerresults(results)
        console.log(results)
    }




    return (

        <>
            <button onClick={getData}>Get id{selectid}</button>
        </>





    )






}



export default Testing