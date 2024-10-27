import { NavLink } from 'react-router-dom'
import React from 'react'
import classes from "./sidebarlink.module.css"

const SideBarLink = ({ icon, href, title }) => {
    return (
        <>
            <li className={classes["sidebar-items"]}>
                <NavLink to={href}>
                    {({ isActive, isPending, isTransitioning }) => (
                        <>
                            <i className={isActive ? `${icon} ${classes['activeitem']}` : `${icon}`} />
                            <span>{title}</span>
                        </>
                    )}
                    
                </NavLink>
            </li>
        </>
    )
}

export default SideBarLink