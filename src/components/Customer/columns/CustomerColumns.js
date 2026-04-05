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
        accessorKey: 'county',
        sortingFn: 'text',
    },
    {
        header: 'Email',
        accessorKey: 'email',
        disableFilters: true,
    },
    {
        header: 'Billing Address',
        accessorKey: 'billing_one',
        disableFilters: true,
    },
    {
        header: 'City ',
        accessorKey: 'billing_city',
        disableFilters: true,
    },
    {
        header: 'State ',
        accessorKey: 'billing_state',
        disableFilters: true,
    },
    {
        header: 'Zip ',
        accessorKey: 'billing_zip',
        disableFilters: true,
    }
];

export default COLUMNS