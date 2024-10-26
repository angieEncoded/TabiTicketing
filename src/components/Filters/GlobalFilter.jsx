import Form from 'react-bootstrap/Form'
import classes from './filter.module.css'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <Form.Control
            autoFocus
            className={`mb-2 ${classes['search-input']}`}
            id="inlineFormInput"
            placeholder="Search"
            value={filter || ''}
            onChange={e => setFilter(e.target.value)}
        />
    )
}