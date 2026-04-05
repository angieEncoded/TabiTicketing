import React from 'react'

const ContactDisplay = () => {
    const contact = '';


    return (
    <div>          <h5 className="text-center baskerville-font mb-3">Contacts</h5>
        {contact === '' &&             <p className="text-center">No Contacts recorded for this customer.</p>}
</div>
  )
}

export default ContactDisplay
