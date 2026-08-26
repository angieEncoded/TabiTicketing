import TicketDisplay from "../components/Ticket/TicketDisplay.jsx"
import PhoneInput from 'react-phone-number-input/input'
import { useState } from "react"

const Testing = () => {

  const [value, setValue] = useState()


    return (
       <>
            <PhoneInput
            country="US"
            value={value}
            onChange={setValue}
            />
  
       </>
          
    )
}



export default Testing