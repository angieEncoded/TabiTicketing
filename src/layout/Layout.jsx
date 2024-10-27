import NavBar from './NavBar'
import React from 'react'
import SideBar from "./SideBar"
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { Flip } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'

const Layout = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 760px)' }) // we need stuff moved down if its a small tablet

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="tabi-container">
                <div className="container-fluid">
                    {isTabletOrMobile &&
                        <div className="mt-5">
                            <Outlet />
                        </div>
                    }
                    {!isTabletOrMobile &&
                        <Outlet />
                    }
                </div>
            </div>
            <ToastContainer
                transition={Flip}
                position="top-right"
                autoClose={20000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Layout