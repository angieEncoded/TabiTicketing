import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const SettingsButtons = () => {



  
  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty");

  const handleButton = (type) => {
    if (type === 'Technician') { setCurrentComponent('Technician') }

  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }

  return (
    <div className="container">

      <div className="ms-start d-grid gap-2 d-md-block mb-3">
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" >Do Something</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3">Do Something Else</button>
      </div>

      {currentComponent === 'Empty' && <></>}

    </div>
  )
}

export default SettingsButtons