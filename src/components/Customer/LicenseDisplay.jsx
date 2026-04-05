import React from 'react'

const LicenseDisplay = () => {
  const licenses = ''

 

  return (
    <>
    
    

          <h5 className="text-center baskerville-font mb-3">Licenses</h5>
        {licenses === '' &&  <p className="text-center">No licenses recorded for this customer.</p>}
    </>
  )
}

export default LicenseDisplay