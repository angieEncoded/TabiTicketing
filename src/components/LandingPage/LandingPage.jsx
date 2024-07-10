import React, { useMemo, useState } from 'react'
import urls from "../../util/apiPaths.json"
import useFetch from '../../hooks/useFetch'
import classes from "./landingpage.module.css"
import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import customerColumnDef from "./customerColumns"

const LandingPage = () => {

  const { isPending, error, data } = useFetch(urls.getCustomerData)

  const memoizedData = useMemo(() => data, [data]); // dependant on data being present
  const memoizedColumns = useMemo(() => customerColumnDef, []);
  const [sorting, setSorting] = useState([]);

  const customerTableInstance = useReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(), // hook to give us access to all rows
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting
    },
    onSortingChange: setSorting,
  })

 const handleRowClick = (row) => {
  console.log(row.original) // data from the clicked row
 }











  return (

    <>
      {!isPending && !error && (
        <>
          <table className="table table-striped table-bordered table-responsive table-responsive table-secondary table-hover">
            {/* TABLE HEADER */}
            <thead>
              {customerTableInstance.getHeaderGroups().map(headerRow => {
                return (
                  <tr key={headerRow.id}>
                    {headerRow.headers.map(headerColumn => {
                      return (
                        <th className={'tabi-pointer'} key={headerColumn.id} colSpan={headerColumn.colSpan} onClick={headerColumn.column.getToggleSortingHandler()}>
                          {
                            { asc: <i className='las la-arrow-up tabi-main-color'></i>, desc: <i className='las la-arrow-down tabi-main-color'></i> }[
                            headerColumn.column.getIsSorted() ?? null
                            ]
                          }
                          {flexRender(
                            headerColumn.column.columnDef.header,
                            headerColumn.getContext()
                          )}

                        </th>
                      );
                    })}
                  </tr>
                )
              })}
            </thead>
            {/* TABLE HEADER */}

            <tbody>
              {customerTableInstance.getRowModel().rows.map(dataRow => {
                return (
                  <tr key={dataRow.id} onClick={() => handleRowClick(dataRow)} className={classes["tabi-hover"]}>
                    {dataRow.getVisibleCells().map(dataCell => {
                      return (
                        <td key={dataCell.id}>
                          {flexRender(
                            dataCell.column.columnDef.cell,
                            dataCell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>

          </table>

          {/* Change the number of pages */}
          <div className="row">
            <div className="col-2">
              <select className="form-select"
                value={customerTableInstance.options.state.pagination.pageSize}
                onChange={event => customerTableInstance.setPageSize(Number(event.target.value))}
              >
                {
                  [10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Items per page: {pageSize}
                    </option>
                  ))
                }
              </select>

            </div>
            <div className="col-12"></div>


          </div>



          {/* Pagination segment */}
          <div className="text-center container">
            <button className={`btn mb-2 ${classes['button-not-selected']}`} onClick={() => customerTableInstance.previousPage()} disabled={!customerTableInstance.getCanPreviousPage()}><i className="las la-2x la-arrow-circle-left"></i> </button>{' '}
            <span className="mb-2">{' '}Page  {customerTableInstance.options.state.pagination.pageIndex + 1} of  {customerTableInstance.getPageCount() - 1} {' '}</span>
            <button className={`btn  mb-2 ${classes['button-not-selected']}`} onClick={() => customerTableInstance.nextPage()} disabled={!customerTableInstance.getCanNextPage()}><i className="las la-2x la-arrow-circle-right"></i></button>{' '}
          </div>

        </>
      )}

      {!isPending && error && <div>{error}</div>}






    </>


  )
}

export default LandingPage