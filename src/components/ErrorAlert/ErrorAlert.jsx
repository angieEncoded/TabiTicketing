import React from 'react'

const ErrorAlert = (props) => {
    return (
        <div className="container">
            <div className="alert alert-danger text-center" role="alert">
                {props.error}
            </div>
        </div>
    )
}

export default ErrorAlert
