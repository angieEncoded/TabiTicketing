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
    const loggedInUser = "Angie";

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
                            <Link className="nav-link" to="/queue">Ticket Queue</Link>
                            <Link className="nav-link" to="/open-tasks">Open Tasks</Link>
                            <Link className="nav-link" to="/customers">Customers</Link>
                            <Link className="nav-link" to="/contacts">Contacts</Link>
                            <Link className="nav-link" to="/testing">Angie's mess</Link>
                        </Nav>
                        

                        {/* User Login Controls */}
                        <Nav>
                            <Link className="nav-link" to="/calendar"><i className="las la-calendar-alt"></i></Link>
                            <NavDropdown title={`Welcome, ${loggedInUser}`} id="collasible-nav-dropdown">
                                <Link className="dropdown-item" to="/">Profile</Link>
                                <Link className="dropdown-item" to="/">Settings</Link>
                                <Link className="dropdown-item" to="/">Change Password</Link>
                                <NavDropdown.Divider />
                                <Link className="dropdown-item" to="/">Refresh DB</Link>
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
