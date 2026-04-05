
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../LoadingScreens/Loading.jsx'
import COLUMNS from './columns/LicenseColumns.js'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx"


const LicenseDisplay = ({ recordType, id }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [licenseData, setLicenseData] = useState(false);

    // Grab items from the slices
    const urls = useSelector(state => state.urls.urls);

    // !!! TODO - add default sorting 
    const table = useReactTable({
        data: licenseData,
        columns: COLUMNS,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            pagination: {
                pageSize: 5
            }
        }
    })


    // Initially populate the data
    useEffect(() => {
        const getTableData = async () => {
            try {
                setHasError(false);
                setErrorMessage("");
                setIsPending(true);
                const licenseData = await fetch(`${urls.getLicenseData}/${id}`);
                if (!licenseData.ok) throw new Error("Failed to fetch data. Please check the server.");
                const licenseDataJson = await licenseData.json();
                setLicenseData(licenseDataJson);
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
        toast.info(`Do something with the row :${row.original.id}`)
    }


    return (
        <>

            {isPending && <Loading />}
            {!isPending && hasError && <ErrorAlert error={errorMessage} />}
            {!isPending && !hasError &&

                <>
                    <hr></hr>
                    <h5 className="text-center baskerville-font mb-3">Licenses</h5>

                    {licenseData.length < 1 && <p className="text-center">No Licenses recorded for this customer.</p>}

                    {licenseData && licenseData.length >= 1 &&
                        <>


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
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            <div className={'mb-5'}>
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

                        </>
                    }

                </>
            }

        </>

    )
}

export default LicenseDisplay


