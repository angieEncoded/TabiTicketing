import React from 'react'
import logo from "../assets/tabiLogo.png"

const Home = () => {
  return (
    <>
    
            <div className="container">
                    <h2 className="text-center baskerville-font mb-3">Welcome to TabiTicketing!</h2>
                    <h5 className="text-center baskerville-font mb-5">A Lightweight help desk ticketing solution.</h5>

              <div className="text-center">
                <img src={logo} alt="TabiCRM logo" />
              </div>
              </div>
    
    </>
  )
}

export default Home