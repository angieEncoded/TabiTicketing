import React, { useEffect, useMemo, useState } from 'react'
import { useGlobalFilter, usePagination, useResizeColumns, useTable, } from 'react-table'
import COLUMNS from "./CustomerColumns"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
import { GlobalFilter } from '../Filters/GlobalFilter'
import classes from "./customertable.module.css"
import LargeModal from "../Modal/LargeModal.jsx"
import CustomerForm from '../Forms/CustomerForm'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { customersActions } from '../../store/CustomerSlice'
import Loading from '../LoadingScreens/Loading'

const CustomerTable = () => {

    const urls = useSelector(state => state.urls.urls);
    const customersForTable = useSelector(state => state.cust.customers);

    const [filteredCustomerData, setFilteredCustomerData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    // State slice to show the editing modal
    const [show, setShow] = useState(false);
    const [currentlySelectedCustomer, setCurrentlySelectedCustomer] = useState({});

    // Initially populate the data
    useEffect(() => {
        const getTableData = async () => {
            try {
                setHasError(false);
                setErrorMessage("");
                setIsPending(true);
                const customerData = await fetch(`${urls.getCustomerData}`);
                if (!customerData.ok) throw new Error("Failed to fetch customer data. Please contact tabi.");
                const customerJson = await customerData.json();
                dispatch(customersActions.loadCustomerData(customerJson));
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
                setHasError(true);
                setErrorMessage(error.message);
                toast.error(error.message);
            }
        }
        getTableData();
    }, []);


    // Set filtered data to what we received from state
    useEffect(() => {
        setFilteredCustomerData(customersForTable)
    }, [customersForTable])

    // Set up the colums and data that the table will need - memoization prevents it from recreating the table on every render
    const memoizedColumns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => filteredCustomerData, [filteredCustomerData])

    // Set up the table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setGlobalFilter,
        setPageSize,
        resetResizing,
    } = useTable({ // call the table instance with our data
        columns: memoizedColumns,
        data: data,
        disableSortRemove: true,
    }, useGlobalFilter, usePagination, useResizeColumns)

    const { pageIndex, pageSize, globalFilter } = state; // pagination has additional destructuring from the state object


    // Handle getting fresh data from the database and passing into the form
    const handleRowClick = async (row) => {

        try {
            const results = await fetch(`${urls.getCustomerById}${row.original.custid}`);
            if (!results.ok) {
                setIsPending(false);
                throw new Error(results.statusText);
            }
            const jsonResults = await results.json();
            setCurrentlySelectedCustomer(jsonResults.customer[0])
            setShow(true);
        } catch (error) {
            toast.error(error.message)
            saveLogData({
                module: "add-customer UseEffect Hook",
                error: error,
                note: "Something threw an error into the catch block"
            })
        }

    }



    // Closing the modal without saving any changes
    const handleClose = () => {
        // setCurrentPet(undefined)
        setShow(!show);
        setCurrentlySelectedCustomer({});// reset it just to keep things clean
    }

    return (
        <>

            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&
                <>


                    <div>
                        <div className="background mt-1">

                            {/* HANDLE EDITING CUSTOMER FROM THE ALL CUSTOMERS TABLE */}
                            <LargeModal showFormModal={show} hideFormModal={handleClose}>
                                <CustomerForm
                                    closeForm={handleClose}
                                    customerData={currentlySelectedCustomer}
                                    isModal={true}
                                />
                            </LargeModal>


                            {/* Filter the table */}
                            < div className="row justify-content-center" >
                                <div className="col-12 col-md-5 mb-2">
                                    <h2 className={"noticaText"}>Showing results for all Customers</h2>
                                </div>
                                <div className="col-12 col-md-5">
                                </div>
                                <div className="col-12 col-md-2">
                                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                </div>
                            </div >



                            <table {...getTableProps()} className={`table table-fixed table-striped table-bordered table-responsive table-sm table-responsive table-secondary table-hover`}>
                                <thead>

                                    {/* Loop over the header rows */}
                                    {headerGroups.map((headerGroup) => (

                                        // Apply header row props
                                        <tr key={headerGroup.getHeaderGroupProps().key} role={headerGroup.getHeaderGroupProps().role} className={headerGroup.getHeaderGroupProps().className} style={headerGroup.getHeaderGroupProps().style}>


                                            {/* Loop over the headers in each row */}
                                            {headerGroup.headers.map((column) => (

                                                // Apply the header cell props with the toggle sort at the header
                                                <th key={column.getHeaderProps().key} width={column.width} role={column.getHeaderProps().role} className={column.getHeaderProps().className} style={column.getHeaderProps().style}>

                                                    {/* Render the actual header */}
                                                    <div>{column.render("Header")}</div>


                                                </th>


                                            ))}
                                        </tr>
                                    ))}

                                </thead>

                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>

                                    {/* Loop over the pages*/}
                                    {page.map(row => {
                                        prepareRow(row)
                                        return (

                                            // Handle single click here to open the pet record - no double click on mobile
                                            <tr key={row.getRowProps().key} onClick={() => handleRowClick(row)} className={`tabi-hover ${row.getRowProps().className}`}>
                                                {
                                                    // Loop over the cells
                                                    row.cells.map(cell => {
                                                        return <td key={cell.getCellProps().key} className={`ellipsis`} >{cell.render('Cell')}</td>
                                                    })
                                                }

                                            </tr>


                                        )
                                    })}
                                </tbody>
                            </table>


                            {/* Change the number of pages */}
                            <select value={pageSize} onChange={event => setPageSize(Number(event.target.value))}>
                                {
                                    [10, 25, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))
                                }
                            </select>

                            {/* Pagination segment */}
                            <div className="text-center container">
                                <button className={`btn  mb-2  ${classes['button-not-selected']}`} onClick={() => previousPage()} disabled={!canPreviousPage}><i className="las la-2x la-arrow-circle-left"></i> </button>{' '}
                                <span className=" mb-2 ">{' '}Page {pageIndex + 1} of {pageOptions.length} {' '}</span>
                                <button className={`btn  mb-2 ${classes['button-not-selected']}`} onClick={() => nextPage()} disabled={!canNextPage}><i className="las la-2x la-arrow-circle-right"></i></button>{' '}
                            </div>
                        </div>
                    </div>

                </>
            }

        </>





    )
}

export default CustomerTable