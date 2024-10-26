import React from 'react'
import classes from "./loading.module.css"

const Loading = () => {
    return (
        <>
            <div className={classes.spinnerBackdrop}>
                <div className={classes.spinner}></div>
            </div>
        </>
    )
}


export default Loading
