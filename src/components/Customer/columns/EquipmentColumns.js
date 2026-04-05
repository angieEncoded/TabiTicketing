const COLUMNS = [
    {
        header: 'Type',
        accessorKey: 'equipment_type',
        sortingFn: 'text',
    },
    {
        header: 'Vendor',
        accessorKey: 'vendor',
        disableFilters: true,
    },
    {
        header: 'Model',
        accessorKey: 'model',
        sortingFn: 'text',
    },
    {
        header: 'Internal IP',
        accessorKey: 'internal_ip_address',
        disableFilters: true,
    },
    {
        header: 'External IP',
        accessorKey: 'external IP',
        disableFilters: true,
    },
    {
        header: 'Mask',
        accessorKey: 'subnet_mask',
        disableFilters: true,
    },
    {
        header: 'Gateway',
        accessorKey: 'gateway',
        disableFilters: true,
    }
];

export default COLUMNS