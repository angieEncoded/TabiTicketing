const COLUMNS = [
    {
        header: 'First Name',
        accessorKey: 'first_name',
        sortingFn: 'text',
    },    
    {
        header: 'Last Name',
        accessorKey: 'last_name',
        sortingFn: 'text',
    },
    {
        header: 'Primary Phone',
        accessorKey: 'primary_phone',
        disableFilters: true,
    },
    {
        header: 'Extension',
        accessorKey: 'extension',
        sortingFn: 'text',
    },
    {
        header: 'Job Title',
        accessorKey: 'job_title',
        disableFilters: true,
    },

];

export default COLUMNS