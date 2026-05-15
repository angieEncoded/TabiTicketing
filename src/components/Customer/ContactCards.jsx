import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const ContactCards = () => {

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
  <h5 className="text-center baskerville-font mb-3">Contacts</h5>

                  {selectedCustomer?.contacts?.length < 1 && <p className="text-center">No contacts recorded for this customer.</p>}

                  {selectedCustomer?.contacts?.length >= 1 &&
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {selectedCustomer.contacts?.map(contact => (
                    <div className="col" key={contact.id}>
                        <Card >
                            <Card.Body>
                                <Card.Title>{contact.first_name} {contact.last_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{contact.job_title}</Card.Subtitle>

                                <hr></hr>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Work Phone: {contact.work_phone}
                                        {contact.work_phone &&
                                            <>
                                                {clipboard && clipboard === `work_phone_${contact.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i></span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`work_phone_${contact.id}`, contact.work_phone)}>
                                                        </i>
                                                    </span>
                                                }
                                            </>
                                        }

                                    </ListGroup.Item>

                                    <ListGroup.Item>Cell Phone: {contact.cell_phone}
                                        {contact.cell_phone &&
                                            <>
                                                {clipboard && clipboard === `cell_phone_${contact.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i></span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`cell_phone_${contact.id}`, contact.cell_phone)}>
                                                        </i></span>
                                                }

                                            </>
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item>Email: {contact.email}
                                        {contact.email &&
                                            <>
                                                {clipboard && clipboard === `email_${contact.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i></span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`email_${contact.id}`, contact.email)}>
                                                        </i></span>
                                                }
                                            </>
                                        }
                                    </ListGroup.Item>

                                </ListGroup>


                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
}
        </>

    )
}

export default ContactCards