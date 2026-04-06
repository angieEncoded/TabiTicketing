import { useEffect, useState } from 'react'
import { ticketsActions } from '../../store/TicketSlice.js'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../LoadingScreens/Loading.jsx'
import LargeModal from "../Modal/LargeModal.jsx"
import COLUMNS from './TicketColumns.js';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"


const TicketTable = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(false);


    // Grab items from the slices
    const urls = useSelector(state => state.urls.urls);
    const ticketsForTable = useSelector(state => state.tick.tickets);

    const dispatch = useDispatch();


    // !!! TODO - add default sorting 
    const table = useReactTable({
        data: ticketsForTable,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
    })

    // Initially populate the data
    useEffect(() => {
        const getTableData = async () => {
            try {
                setHasError(false);
                setErrorMessage("");
                setIsPending(true);
                const ticketData = await fetch(`${urls.getTicketData}`);
                if (!ticketData.ok) throw new Error("Failed to fetch customer data. Please check the server.");
                const ticketDataJson = await ticketData.json();
                dispatch(ticketsActions.loadTicketData(ticketDataJson));
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

    const handleRowClick = async (row) => {
        setSelectedTicket(row.original); // set the state to the currently selected customer
        setShowModal(true); // show the modal with the form
    }

    const closeModal = () => {
        setSelectedTicket({}); // clean up the state
        setShowModal(false); // close the modal
    }


    return (
        <>
            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&

                <>

                    {showModal && <LargeModal hideFormModal={closeModal} showFormModal={showModal} title={`${selectedTicket.title}`}>
                        <div>THE CUSTOM TICKET COMPONENT WILL BE IN HERE</div>
                        <div>Ticket ID {selectedTicket.id}</div>
                        <div>Assigned to: {selectedTicket.technician.first_name} {selectedTicket.technician.last_name}</div>
                    </LargeModal>}

                    {ticketsForTable.length < 1 && <h3 className="text-center noticaText">There's no Tickets! Why don't you add some? I'm sure someone needs your help!</h3>}

                    {ticketsForTable && ticketsForTable.length >= 1 &&

                        <>

                            <div className="form-background mb-5 mx-auto">
                                <h2 className="text-center noticaText">Currently Open Tickets</h2>

                                <div className="row mb-3 g-3">
                                    <div className='col-auto ms-auto'>
                                        <input className='form-control'
                                            onChange={e => table.setGlobalFilter(String(e.target.value))}
                                            placeholder="Search..."
                                        />
                                    </div>
                                </div>

                                <table className='table table-striped table-hover tabi-hover'>
                                    <thead>
                                        {table.getHeaderGroups().map((hg) => (
                                            <tr key={hg.id}>
                                                {hg.headers.map((header) => (
                                                    <th key={header.id}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody>
                                        {table.getRowModel().rows.map((row) => (
                                            <tr key={row.id} onClick={() => handleRowClick(row)}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <td
                                                        className={
                                                        `${row.original.priority === 'LOW' && 'text-primary'} 
                                                        ${row.original.priority === 'MEDIUM' && 'text-warning'}
                                                        ${row.original.priority === 'HIGH' && 'text-danger'}
                                                        ${row.original.priority === 'CRITICAL' && 'text-danger'}
                                                        `
                                                        }
                                                        key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* ITEMS PER PAGE */}
                                <div className="row g-3">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-auto ms-start">
                                                <div className="mb-3">
                                                    <select className={'form-select'}
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
                                        </div>
                                    </div>

                                    <div className="col text-center">
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

                                    <div className="col"></div>





                                </div>
                            </div>
                        </>}

                </>
            }

        </>

    )
}

export default TicketTable