import NavBar from './NavBar'
import React from 'react'
import SideDrawer from "./SideDrawer"

// import React, { useEffect, useState } from 'react'



// import { useNavigate } from "react-router-dom";

// import QuickList from "../components/QuickList/QuickList"



const Layout = (props) => {

    // Handle back and forward buttons if we so choose - 
    // Since everything flows through the layout component, it can listen for all browser events
    // const [locationKeys, setLocationKeys] = useState([])
    // const history = useNavigate()
    // useEffect(() => {
    //     return history.listen(location => {
    //         if (history.action === 'PUSH') {
    //             setLocationKeys([location.key])
    //             console.log("Visited a new page in the app")
    //         }

    //         if (history.action === 'POP') {
    //             // window.location.reload()
    //             // console.log(locationKeys)
    //             if (locationKeys[1] === location.key) {
    //                 // console.log(locationKeys)
    //                 setLocationKeys(([_, ...keys]) => keys)

    //                 console.log("hit a forward event")

    //             } else {
    //                 // console.log(locationKeys)
    //                 setLocationKeys((keys) => [location.key, ...keys])

    //                 console.log("hit a back event")

    //             }
    //         }
    //     })
    // }, [locationKeys, history])


    return (

        <>
            {/* Navigation bar */}
            <NavBar />

            {/* Side Navigation */}
            <SideDrawer />

            {/* Content Container  - Wrap any page or main component in the Layout component and start building content*/}
            <div className="tabi-container">
                <div className="container-fluid">
                    {props.children}
                </div>

            </div>

            {/* <QuickList /> */}
        </>




    )





}

export default Layout