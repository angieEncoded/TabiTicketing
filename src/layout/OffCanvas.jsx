import { Link } from "react-router-dom"
import Offcanvas from 'react-bootstrap/Offcanvas'
import React from 'react'
import { offcanvasLinks } from "./Links"
import { useSelector } from "react-redux"


const OffCanvas = (props) => {
    const isAuthenticated = useSelector(store => store.auth.isAuthenticated)

    return (
        <>
            {isAuthenticated &&
                <Offcanvas show={props.show} onHide={props.handleClose}>
                    <Offcanvas.Header closeButton >
                        <Offcanvas.Title>Tasks</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="row row-cols-2 g-2">
                            {offcanvasLinks.map(link => (
                                <div className="col" key={link.href}>
                                    <Link to={link.href} className="tabi-main-color btn btn-outline-secondary mb-2 tabi-fitbuttons" onClick={props.handleClose}><i className={link.icon}></i> <br />{link.title}</Link>
                                </div>
                            ))}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </>
    )
}

export default OffCanvas
