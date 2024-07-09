import { Link } from 'react-router-dom'
import React from 'react'
import classes from "./sidebar.module.css"

// Send in 
// icon
// title
// clickFunction


const SidebarLink = (props) => {
    return (
        <>
            <li className={classes["sidebar-items"]}>
                <Link to={props.href}>
                    <i className={props.icon}></i>
                    <span>{props.title}</span>
                </Link>
            </li>
        </>
    )
}

export default SidebarLink
