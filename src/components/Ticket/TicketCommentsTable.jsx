import React from 'react';
import { useForm } from "react-hook-form";
import Buttontabi from "../Button/Buttontabi";
import { useState, useEffect } from 'react';
import regexPatterns from "../../util/regexPatterns";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import urls from "../../util/apiPaths.json";
import { getSelectedTicketData } from "../../util/helperFunctions"
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import COLUMNS from "./TicketCommentsColumns.jsx";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';



const TicketCommentsTable = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selectedTicketComments = useSelector(state => state.sticket.ticket);
  
  const table = useReactTable({
    data: selectedTicketComments.ticket_comments,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  })


const popover = (row) => {
  return (
  <Popover id={row.original.id}  style={{ '--bs-popover-max-width': '500px' }}>
    <Popover.Header as="h3">Comment Details</Popover.Header>
    <Popover.Body>
      {row.original.comment}
    </Popover.Body>
  </Popover>
);
}



  const handleRowClick = async (row) => {
    toast.info(row.createdAt)

  }

  return (

    <>
      {isPending && <Loading />}
      {!isPending && hasError && <ErrorAlert error={errorMessage} />}
      {!isPending && !hasError &&

        <>
        <hr></hr>
          {selectedTicketComments.ticket_comments && selectedTicketComments.ticket_comments.length < 1 && <h3 className="text-center noticaText">There are no comments on this ticket</h3>}
        <hr></hr>
          {selectedTicketComments.ticket_comments && selectedTicketComments.ticket_comments.length >= 1 &&

            <>
              <div className="form-background mb-5 mx-auto">
                <h4 className="text-center noticaText">Comments</h4>

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
                          <OverlayTrigger trigger="click" placement="top" overlay={popover(row)} rootClose key={row.id}>
                            <tr key={row.id} >
                              {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              ))}
                            </tr>
                          </OverlayTrigger>
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

export default TicketCommentsTable