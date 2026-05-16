const COLUMNS = [
    {
        header: 'Customer Name',
        accessorKey: 'customer_name',
        sortingFn: 'text',
    },
    {
        header: 'Primary Phone',
        accessorKey: 'primary_phone',
        disableFilters: true,
    },
    {
        header: 'County',
        accessorFn: row => `${row.addresses.length > 0 ? row.addresses[0].county : ''}`,
        sortingFn: 'text',
    },
    {
        header: 'Email',
        accessorKey: 'email',
        disableFilters: true,
    },
    {
        header: 'Billing Address',
        accessorFn: row => `${row.addresses.length > 0 ? row.addresses[0].street1 : ''}`,
        disableFilters: true,
    },
    {
        header: 'City ',
        accessorFn: row => `${row.addresses.length > 0 ? row.addresses[0].city : ''}`,
        disableFilters: true,
    },
    {
        header: 'State ',
        accessorFn: row => `${row.addresses.length > 0 ? row.addresses[0].state : ''}`,
        disableFilters: true,
    },
    {
        header: 'Zip ',
        accessorFn: row => `${row.addresses.length > 0 ? row.addresses[0].zip : ''}`,
        disableFilters: true,
    }
];

export default COLUMNS