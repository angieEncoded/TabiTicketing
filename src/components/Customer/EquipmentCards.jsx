import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';


const EquipmentCards = () => {

    const selectedCustomer = useSelector(state => state.scust.customer)
    const [clipboard, setClipboard] = useState(false);

    // handle these two timers with a reference
    const clipTimer = useRef(null);

    // Clean up any residuals on the clipboard
    useEffect(() => {

        // unmount callback to clean up some timer stuff
        return () => {
            if (clipTimer.current != null) {
                window.clearTimeout(clipTimer)
            }
        }
    }, [])


    const copyToClipboard = (card, value) => {

        setClipboard(card)

        clipTimer.current = setTimeout(() => {
            setClipboard(false);
        }, 3000);
        toast.success("Copied!");
        navigator.clipboard.writeText(value);

        return;
    }




    return (
        <>
            {selectedCustomer.equipment?.length < 1 && <h4>there is no equipment for this customer</h4>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {selectedCustomer.equipment?.map(equipment => (
                    <div className="col" key={equipment.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{equipment.vendor} {equipment.model}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{equipment.equipment_type}</Card.Subtitle>

                                <hr></hr>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Internal IP: </strong>{equipment.internal_ip_address}
                                        {equipment.internal_ip_address &&
                                            <>
                                                {clipboard && clipboard === `internal_ip${equipment.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i>
                                                    </span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`internal_ip${equipment.id}`, equipment.internal_ip_address)}>
                                                        </i></span>}
                                            </>
                                        }


                                    </ListGroup.Item>
                                    <ListGroup.Item><strong>External IP: </strong>{equipment.external_ip_address}
                                        {equipment.external_ip_address &&
                                            <>
                                                {clipboard && clipboard === `external_ip${equipment.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i>
                                                    </span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`external_ip${equipment.id}`, equipment.external_ip_address)}>
                                                        </i></span>}
                                            </>
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item><strong>Gateway:</strong> {equipment.gateway}</ListGroup.Item>
                                    <ListGroup.Item><strong>Subnet:</strong> {equipment.subnet_mask}</ListGroup.Item>
                                </ListGroup>


                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>







        </>


    )
}

export default EquipmentCards