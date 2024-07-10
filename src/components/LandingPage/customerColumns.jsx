import classes from "./landingpage.module.css"

const customerColumnDef = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'customer_name',
        header: 'Customer Name'
    },
    {
        accessorKey: 'primary_phone',
        header: 'Primary Phone'
    },
    {
        accessorKey: 'secondary_phone',
        header: 'Secondary Phone'
    },
    {
        accessorKey: 'website',
        header: 'Website',
        cell: ({getValue}) => {
            return <span className={`text-truncate ${classes["cell-width"]}`}>{getValue()}</span>
            }
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
        cell: ({getValue}) => {
            return <span className={`text-truncate ${classes["cell-width"]}`}>{getValue()}</span>
            }
    },
    {
        accessorKey: 'status',
        header: 'Status'
    }

]


export default customerColumnDef;