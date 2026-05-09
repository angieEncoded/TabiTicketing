import React from 'react'
import { useState } from 'react'
import { default as CustomerDisplayComponent } from '../components/Customer/CustomerDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { tabActions } from '../store/TabDisplaySlice'


const CustomerDisplay = ({ recordType, id, recordName }) => {

  // const currentTab = useSelector(state => state.tab.currentTab);
  // const ticketID = useSelector(state => state.tab.ticketId)

  // const dispatch = useDispatch()

  // const handleClick = (tab) =>{
  //   if(tab === "MAIN"){ dispatch(tabActions.loadTabData({currentTab : "MAIN"}))}
  // }

  return (

    <>
      {/* <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a className="nav-link active tabi-hover" onClick={() => handleClick("MAIN")}>Details</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">{currentTab === "TICKET" ? "Ticket" : ""}</a>
        </li>
      </ul> */}
      
    {/* {currentTab === "MAIN" && */}
        <CustomerDisplayComponent recordName={recordName} recordType={recordType} id={id}></CustomerDisplayComponent>
    {/* } */}
    {/* {currentTab === "TICKET" && 
    <p>TESTING</p>
     } */}



    </>
  )
}

export default CustomerDisplay