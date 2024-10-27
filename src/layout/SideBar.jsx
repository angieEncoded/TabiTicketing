import React from 'react'
import SidebarLink from "./SideBarLink"
import classes from "./sidebar.module.css"
import { sidebarLinks } from "./Links"
import { useSelector } from 'react-redux'
const SideBar = () => {

    const isAuthenticated = useSelector(store => store.auth.isAuthenticated)

    return (
        <>
        {isAuthenticated &&
            <div className={classes["sidebar-cont"]}>
                <ul className={classes.sidebar}>
                    <div>
                        {sidebarLinks.map(link => (
                            <SidebarLink href={link.href} icon={link.icon} title={link.title} key={link.title} />
                        ))}
                    </div>
                </ul>
            </div>
        }
        </>
    )
}

export default SideBar
