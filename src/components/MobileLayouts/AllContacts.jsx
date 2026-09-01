import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllContactsData } from "../../util/helperFunctions";
import COLUMNS from '../Tables/columns/ContactColumns';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'

const AllContacts = () => {

    const [clipboard, setClipboard] = useState(false);
    const [contacts, setContacts] = useState({ contacts: [] });
    const [isPending, setIsPending] = useState(false);

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


    // Grab all the contacts
    // Initially populate the data
    useEffect(() => {
        // Wrap in an async
        const getData = async () => {
            try {
                setIsPending(true)
                const results = await getAllContactsData(); // reach out to the helper function
                console.log(results)
                if (results.status === 200) {
                    setContacts({ contacts: results.contacts.contacts })
                    setIsPending(false);
                } else {
                    setIsPending(false);
                    toast.error(`${results.status} ${results.message}`)
                }
            } catch (error) {
                setIsPending(false);
                toast.error(error);
            }
        }
        getData();
    }, []);



    // !!! TODO - add default sorting 
    const table = useReactTable({
        data: contacts.contacts,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    })



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

            {contacts?.contacts?.length < 1 && <p className="text-center">No contacts recorded for this customer.</p>}

            {contacts?.contacts?.length >= 1 &&

                <>




                    <div className="row mb-3 g-3 mt-3">
                        <div className='col-auto ms-auto'>
                            <input className='form-control'
                                onChange={e => table.setGlobalFilter(String(e.target.value))}
                                placeholder="Search..."
                            />
                        </div>
                    </div>


                    <div className="row mt-3 mb-5 row-cols-1 row-cols-md-2 row-cols-xl-4 g-2">
                        {table.getRowModel().rows.map(row => (
                            <div className="col" key={row.original.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{row.original.first_name} {row.original.last_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{row.original.job_title}</Card.Subtitle>

                                        <hr></hr>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Work Phone: {row.original.work_phone}
                                                {row.original.work_phone &&
                                                    <>
                                                        {clipboard && clipboard === `work_phone_${row.original.id}` ?
                                                            <span className="text-success">
                                                                <i className="las la-check mx-2"></i></span> :
                                                            <span className={"text-primary"}>
                                                                <i className="lar la-copy tabi-hover mx-2"
                                                                    onClick={() => copyToClipboard(`work_phone_${row.original.id}`, row.original.work_phone)}>
                                                                </i>
                                                            </span>
                                                        }
                                                    </>
                                                }

                                            </ListGroup.Item>

                                            <ListGroup.Item>Cell Phone: {row.original.cell_phone}
                                                {row.original.cell_phone &&
                                                    <>
                                                        {clipboard && clipboard === `cell_phone_${row.original.id}` ?
                                                            <span className="text-success">
                                                                <i className="las la-check mx-2"></i></span> :
                                                            <span className={"text-primary"}>
                                                                <i className="lar la-copy tabi-hover mx-2"
                                                                    onClick={() => copyToClipboard(`cell_phone_${row.original.id}`, row.original.cell_phone)}>
                                                                </i></span>
                                                        }

                                                    </>
                                                }
                                            </ListGroup.Item>
                                            <ListGroup.Item>Email: {row.original.email}
                                                {row.original.email &&
                                                    <>
                                                        {clipboard && clipboard === `email_${row.original.id}` ?
                                                            <span className="text-success">
                                                                <i className="las la-check mx-2"></i></span> :
                                                            <span className={"text-primary"}>
                                                                <i className="lar la-copy tabi-hover mx-2"
                                                                    onClick={() => copyToClipboard(`email_${row.original.id}`, row.original.email)}>
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















                    {/* ITEMS PER PAGE */}
                    <div className="row g-3 mt-5">


                        <div className="col-12 col-md-4 justify-content-center justify-content-sm-start d-flex ">
                                    <div className="mb-3">
                                        <select className={'form-select w-auto'}
                                            value={table.getState().pagination.pageSize}
                                            onChange={e => {
                                                table.setPageSize(Number(e.target.value))
                                            }}
                                        >
                                            {[10, 20, 30, 40, 50].map(pageSize => (
                                                <option key={pageSize} value={pageSize}>
                                                    {pageSize}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                        </div>

                        <div className="col-12 col-md-4 text-center mb-5">
                            <button className='btn btn-sm btn-tabi-logo mx-1'
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </button>
                            <button className='btn btn-sm btn-tabi-logo mx-1'
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<'}
                            </button>
                            <button className='btn btn-sm btn-tabi-logo mx-1'
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>'}
                            </button>
                            <button className='btn btn-sm btn-tabi-logo mx-1'
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </button>
                        </div>

                        <div className="col col-md-4"></div>





                    </div>

                </>








            }
        </>

    )
}

export default AllContacts