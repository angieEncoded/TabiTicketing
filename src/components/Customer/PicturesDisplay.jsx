import React from 'react'

const PicturesDisplay = () => {


    const pictures = '';

  return (
    <>
    
        <h5 className="text-center baskerville-font mb-3">Licenses</h5>
        {pictures === '' &&  <p className="text-center">No pictures recorded for this customer.</p>}
   
   </>
  )
}

export default PicturesDisplay