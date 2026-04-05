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
    {
        header: 'License File',
        accessorKey: 'license_file',
        disableFilters: true,
    },
    {
        header: 'Expires',
        accessorKey: 'expires',
        disableFilters: true,
    }
];

export default COLUMNS