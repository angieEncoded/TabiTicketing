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
    columnHelper.accessor('createdAt', {
        header: 'Opened',
        // The cell property is specifically for rendering the UI (icons, JSX)
        cell: (info) => {
            const unformatted = new Date(info.getValue());
            return unformatted.toLocaleDateString('en-US'); // e.g., "5/7/2026"
        },
    }),
    columnHelper.accessor('updatedAt', {
        header: 'Last Touched',
        // The cell property is specifically for rendering the UI (icons, JSX)
        cell: (info) => {
            const unformatted = new Date(info.getValue());
            return unformatted.toLocaleDateString('en-US'); // e.g., "5/7/2026"
        },
    }),
    {
        header: 'Technician',
        accessorFn: row => row.user?.id == null ? 'UNASSIGNED' : `${row.user?.first_name} ${row.user?.last_name}`,
        disableFilters: true,
    },
];

export default COLUMNS