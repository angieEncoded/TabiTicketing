import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const COLUMNS = [
        columnHelper.accessor('comment', {
        cell: info => (
            <div
                className="ellipsis"
                title={info.getValue()}
                style={{ width: info.column.getSize() }}
            >
                {info.getValue()}
            </div>
        ),
    }),
    {
        header: 'Technician',
        accessorFn: row => `${row.user.first_name} ${row.user.last_name} `,
        disableFilters: true,
    },
    columnHelper.accessor('createdAt', {
        header: 'Posted',
        // The cell property is specifically for rendering the UI (icons, JSX)
        cell: (info) => {
            const unformatted = new Date(info.getValue());
            return `${unformatted.toLocaleDateString('en-US')} at ${unformatted.toLocaleTimeString('en-US')} `;
        },
    }),

];

export default COLUMNS