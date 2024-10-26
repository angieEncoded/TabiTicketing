import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navigation from 'react-bootstrap/Navbar'
import OffCanvas from './OffCanvas'
import classes from "./navbar.module.css"
import placeholderLogo from "../assets/icons/logo.png"

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navigation collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
                <Container fluid>
                    <Navigation.Brand className="ms-">
                        <Link className="navbar-brand" to="/">
                            <img
                                alt=""
                                src={placeholderLogo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                             TabiTicketing
                        </Link>
                        <Button variant="secondary ms-2 text-light" className={classes["bar-hide"]} onClick={handleShow}>
                            <i className="las la-table"></i> CRM Tasks
                        </Button>
                    </Navigation.Brand>



                    <Navigation.Toggle aria-controls="responsive-navbar-nav" />
                    <Navigation.Collapse id="responsive-navbar-nav">

                        {/* Main Navigation */}
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/">Customers</Link>
                            <Link className="nav-link" to="/customers">Ticket Queue</Link>
                        </Nav>

                        {/* User Login Controls */}
                        <Nav>
                            <NavDropdown title="User Actions Placeholder" id="collasible-nav-dropdown">
                                <Link className="dropdown-item" to="/">Profile</Link>
                                <Link className="dropdown-item" to="/">Settings</Link>
                                <Link className="dropdown-item" to="/">Change Password</Link>
                                <NavDropdown.Divider />
                                <Link className="dropdown-item" to="/">Manually refresh Database</Link>
                            </NavDropdown>
                        </Nav>
                    </Navigation.Collapse>
                </Container>
            </Navigation>
            <OffCanvas show={show} handleClose={handleClose} />
        </>
    )
}

export default NavBar
