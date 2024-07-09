import React from 'react'
import classes from "./sidebar.module.css"
import { sidebarLinks } from "../util/Links"
import SidebarLink from '../components/Links/SidebarLink'


// import { useLocation } from 'react-router-dom'

const SideDrawer = () => {

    // Use this to conditionally render links
    // const location = useLocation();
    // console.log(location.pathname)
    return (

        <>
            <div className={classes["sidebar-cont"]}>
                <ul className={classes.sidebar}>
                    <div>
                        {sidebarLinks.map(link => (
                            <SidebarLink href={link.href} icon={link.icon} title={link.title} key={link.title} />
                        ))}
                    </div>
                </ul>
            </div>


        </>

    )
}

export default SideDrawer
