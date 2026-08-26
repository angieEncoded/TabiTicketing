import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const COLUMNS = [
    {
        header: 'Title',
        accessorKey: 'title',
        sortingFn: 'text',
    },
    // {
    //     header: 'User',
    //     accessorKey: '',
    //     sortingFn: 'text',
    // },

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
        columnHelper.accessor('ticket_time', {
        header: 'Ticket Time',
        // The cell property is specifically for rendering the UI (icons, JSX)
        cell: (info) => {
            console.log(info.getValue())
            const hours = Math.floor(info.getValue() / 60);
            const minutes = info.getValue() % 60;
            return `${hours}h ${minutes}m`; // e.g., "5/7/2026"
        },
    }),
    {
        header: 'Technician',
        accessorFn: row => row.user?.id == null ? 'UNASSIGNED' : `${row.user?.first_name} ${row.user?.last_name}`,
        disableFilters: true,
    },
];

export default COLUMNS