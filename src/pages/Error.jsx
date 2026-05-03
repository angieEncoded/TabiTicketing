import React from 'react'
import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import SideBar from "../layout/SideBar"
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'




const Error = () => {

  const error = useRouteError();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 760px)' }) // we need stuff moved down if its a small tablet

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="tabi-container">
        <div className="container-fluid">
          {isTabletOrMobile &&
            <div className="mt-5">

             
                <div id="error-page">
                  <h1>Oops!</h1>
                  <p>Sorry, an unexpected error has occurred.</p>
                  <p>Please escalate to the developer</p>
                  <Link to={"/"} className="tabi-main-color btn btn-outline-secondary mb-2 tabi-fitbuttons" >Go Back Home</Link>
                  <p>{error.statusText || error.message}</p>
                </div>
             

            </div>
          }
          {!isTabletOrMobile &&
            
              <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>Please escalate to the developer</p>
                <Link to={"/"} className="tabi-main-color btn btn-outline-secondary mb-2 tabi-fitbuttons" >Go Back Home</Link>
                <p>{error.statusText || error.message}</p>
              </div>
          }
        </div>
      </div>
    </>

  )
}

export default Error