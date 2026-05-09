import React from 'react'
import CustomerDisplay from './CustomerDisplay'
import CustomerButtons from './CustomerButtons'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import ContactTable from './ContactTable';
import AddressDisplay from './AddressDisplay';
import EquipmentTable from './EquipmentTable';
import LicenseTable from './LicenseTable';
import TicketTable from "../Ticket/TicketTable";
import PicturesCarousel from './PicturesCarousel';

const ModalNavigationWrapper = () => {

    const [key, setKey] = useState('home');
    return (
        <>
            <Tabs
                id="controlled-tab-nav"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                
                <Tab eventKey="home" title="Home">
                    <CustomerButtons />
                    <CustomerDisplay />
                </Tab>

                <Tab eventKey="address" title="Addresses">
                    <AddressDisplay />
                </Tab>

                <Tab eventKey="contact" title="Contacts">
                    <ContactTable />
                </Tab>

                <Tab eventKey="equipment" title="Equipment">
                    <EquipmentTable />
                </Tab>
                <Tab eventKey="license" title="Licenses">
                    <ContactTable />
                </Tab>
                <Tab eventKey="ticket" title="Tickets">
                    <TicketTable />
                </Tab>
                <Tab eventKey="picture" title="Pictures">
                    <PicturesCarousel />
                </Tab>
            </Tabs>


        </>






    )
}

export default ModalNavigationWrapper