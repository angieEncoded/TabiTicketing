import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const COLUMNS = [
    {
        header: 'Vendor',
        accessorKey: 'vendor_name',
        sortingFn: 'text',
    },    
    {
        header: 'Product',
        accessorKey: 'product_name',
        sortingFn: 'text',
    },
    {
        header: 'License Key',
        accessorKey: 'license_key',
        disableFilters: true,
    },
    columnHelper.accessor('license_file', {
    header: 'License File',
    // The cell property is specifically for rendering the UI (icons, JSX)
        cell: (info) => {

            const extension = info.getValue().split('.').pop(); 
    
            let icon;
            if(extension === 'txt'){icon = <i class="las la-file-alt"></i>}
            if(extension === 'pdf'){icon = <i class="las la-file-pdf"></i>}
            if(extension === 'jpg'){icon = <i class="las la-image"></i>}
            if(extension === 'png'){icon = <i class="las la-image"></i>}
            if(extension === 'jpeg'){icon = <i class="las la-image"></i>}
            if(extension === 'gif'){icon = <i class="las la-image"></i>}
            
            return icon

        },
    }),
    {
        header: 'Expires',
        accessorKey: 'expires',
        disableFilters: true,
    }
];

export default COLUMNS;