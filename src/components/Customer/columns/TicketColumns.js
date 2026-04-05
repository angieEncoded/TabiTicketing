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
        accessorFn: row => `${row.technician.first_name} ${row.technician.last_name}`,
        disableFilters: true,
    },
    {
        header: 'Contact',
        accessorFn: row => `${row.contact.first_name} ${row.contact.last_name}`,
        disableFilters: true,
    }
];

export default COLUMNS