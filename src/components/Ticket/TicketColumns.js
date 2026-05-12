import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()


const COLUMNS = [
    {
        header: 'Title',
        accessorKey: 'title',
        sortingFn: 'text',
    },    
    {
        header: 'Status',
        accessorKey: 'status',
        sortingFn: 'text',
    },
    {
        header: 'Priority',
        accessorKey: 'priority',
        disableFilters: true,
    },
    {
        header: 'Technician',
        accessorFn: row => row.user?.id == null ? 'UNASSIGNED' : `${row.user?.first_name} ${row.user?.last_name}`,
        disableFilters: true,
    },
    {
        header: 'Customer',
        accessorFn: row => `${row.customer.customer_name}`,
        disableFilters: true,
    },
    columnHelper.accessor(row => row.contact?.first_name ?? '', {
    id: 'first_name',
    header: 'First Name',
    }),
    columnHelper.accessor(row => row.contact?.last_name ?? '', {
    id: 'Last_name',
    header: 'Last Name',
    }),
];

export default COLUMNS