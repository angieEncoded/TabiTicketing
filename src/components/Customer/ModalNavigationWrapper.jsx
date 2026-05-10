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
import PicturesCarousel from './PicturesCarousel';
import TicketDisplay from '../Ticket/TicketDisplay';
import Buttontabi from '../Button/Buttontabi';

const ModalNavigationWrapper = () => {

    const [key, setKey] = useState('home');
    const [currentTicketId, setCurrentTicketId] = useState(0);

    const handleRowClick = (row) => {
        setCurrentTicketId(row.original.id);
        setKey("ticket");
    }

    const closeTab = () => {
        setCurrentTicketId(0);
        setKey("home");
        
    }


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
                    <CustomerDisplay handleRowClick={handleRowClick}/>
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
                {currentTicketId > 0 &&
                    <Tab 
                    eventKey="ticket" 
                    title={<>Ticket# {currentTicketId} </>}
                    >
                    
                    <TicketDisplay id={currentTicketId} closeTab={closeTab}/>
                    </Tab>
                }
                <Tab eventKey="picture" title="Pictures">
                    <PicturesCarousel />
                </Tab>
            </Tabs>


        </>






    )
}

export default ModalNavigationWrapper