import React, { useState } from 'react'


import MonthlyTicketReport from './MonthlyTicketReport';
import CompletedProjectsReport from './CompletedProjectsReport';

import { useSelector, useDispatch } from 'react-redux'


const Buttons = ({ recordType, openNewTab }) => {


  // set which component is being shown
  const [currentComponent, setCurrentComponent] = useState("Empty");


  const handleButton = (type) => {
    if (type === 'Monthly') { setCurrentComponent('Monthly') }
    if (type === 'Projects') { setCurrentComponent('Projects') }
  }

  const closeComponent = () => {
    setCurrentComponent("Empty")
  }


  return (
    <div className="container">

      <div className="ms-start d-grid gap-2 d-md-block mb-3">
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Monthly')} disabled={currentComponent === 'Monthly'}>Monthly Ticket Report</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" onClick={() => handleButton('Projects')} disabled={currentComponent === 'Projects'}>Completed Projects</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" disabled >ETC</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" disabled>SOMETHING</button>
        <button className="btn btn-sm btn-tabi-logo mx-1 mb-3" disabled>WHATEVER</button>
      </div>


      {currentComponent === 'Empty' && <></>}
      {currentComponent === 'Monthly' && <MonthlyTicketReport closeComponent={closeComponent}></MonthlyTicketReport>}
      {currentComponent === 'Projects' && <CompletedProjectsReport closeComponent={closeComponent}></CompletedProjectsReport>}





    </div>
  )
}

export default Buttons