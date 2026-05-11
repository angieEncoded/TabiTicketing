import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const LicenseCards = () => {

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

    const downloadLicenseFile = (filename) => {
        toast.success(`Wire this up to download file ${filename}`)
    }


    return (
        <>
            {selectedCustomer.licenses?.length < 1 && <h4>There are no licenses for this customer</h4>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {selectedCustomer.licenses?.map(license => (
                    <div className="col" key={license.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{license.product_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{license.vendor_name}</Card.Subtitle>

                                <hr></hr>
                                <ListGroup variant="flush">

                                    <ListGroup.Item>Download License Key: {license.license_key}
                                
                                        {license.license_key &&
                                            <>
                                                {clipboard && clipboard === `license_key_${license.id}` ?
                                                    <span className="text-success">
                                                        <i className="las la-check mx-2"></i></span> :
                                                    <span className={"text-primary"}>
                                                        <i className="lar la-copy tabi-hover mx-2"
                                                            onClick={() => copyToClipboard(`license_key_${license.id}`, license.license_key)}></i>
                                                    </span>}
                                            </>
                                        }


                                    </ListGroup.Item>
                                    <ListGroup.Item>License File:  
                                        {license.license_file.split('.').pop() === 'txt' && <i className="las la-file-alt tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                        {license.license_file.split('.').pop() === 'jpg' && <i className="las la-image tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                        {license.license_file.split('.').pop() === 'png' && <i className="las la-image tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                        {license.license_file.split('.').pop() === 'jpeg' && <i className="las la-image tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                        {license.license_file.split('.').pop() === 'gif' && <i className="las la-image tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                        {license.license_file.split('.').pop() === 'pdf' && <i className="las la-file-pdf tabi-hover mx-3" onClick={() => downloadLicenseFile(license.license_file)}></i>}
                                    </ListGroup.Item>



                                    <ListGroup.Item>Email: {license.email}</ListGroup.Item>
                                </ListGroup>


                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>



        </>


    )
}




export default LicenseCards