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
import ContactCards from './ContactCards';
import EquipmentCards from './EquipmentCards';
import LicenseCards from './LicenseCards';

const ModalNavigationWrapper = () => {

    const [key, setKey] = useState('home');
    const [currentTicketId, setCurrentTicketId] = useState(0);

    const handleRowClick = (row) => {
        setCurrentTicketId(row.original.id);
        setKey("ticket");
    }

    const openNewTab = (id) => {
        setCurrentTicketId(id);
         console.log(id)
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
                    <CustomerButtons openNewTab={openNewTab} recordType={"customer"}/>
                    <CustomerDisplay handleRowClick={handleRowClick}/>
                </Tab>

                <Tab eventKey="contact" title="Contacts">
                    <ContactCards />
                </Tab>

                <Tab eventKey="equipment" title="Equipment">
                    <EquipmentCards />
                </Tab>

                <Tab eventKey="license" title="Licenses">
                    <LicenseCards />
                </Tab>
                {currentTicketId > 0 &&
                    <Tab 
                    eventKey="ticket" 
                    title={<>Ticket# {currentTicketId} </>}
                    >
                    
                    <TicketDisplay id={currentTicketId} closeTab={closeTab} calledFrom={"customer"}/>
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