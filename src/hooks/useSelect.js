import { useState } from 'react'

// validateValue is a function we send into the hook for validating the input
const useInput = (validateValue, defaultValue) => {

    const [enteredValue, setEnteredValue] = useState(defaultValue)                  // Manage state slice to read the input's value - this one needs a default value sent in from the select
    const [wasTouched, setWasTouched] = useState(false)                             // Manage state slice to track whether the user touched the input
    const valueIsValid = validateValue(enteredValue);                               // This will run the function we send into the hook to test the validity (some regex or whatever)
    const hasError = !valueIsValid && wasTouched;                                   // Track whether the input is allowed or not and expose that to the caller

    // Give the user immediate feedback on the state of the input
    const valueChangeHandler = event => {
        setEnteredValue(event.target.value)
        setWasTouched(true)
    }
    
    const valueBlurHandler = (event) => { 
        setWasTouched(true); 
        if(event.relatedTarget && event.relatedTarget.className.includes("modal-close")){ // must add this class to any button used to close a modal
            const target = event.relatedTarget ? (event.relatedTarget): null;
            target.click(); // programmatically hit the click button if we are in the modal. 
        }
        setWasTouched(true); 
    }  

    // This is a reset function we can call in the case that the form was submitted successfully (remember to set value prop on input)
    const resetInput = () => {
        setEnteredValue(defaultValue);
        setWasTouched(false)
    }

    // Experimental, to add in case of coming from edit form
    const initialValueHandler = data => {
        setEnteredValue(data);
        setWasTouched(false)
    }
    


    // Return the state slices to the caller for use in the form
    return {
        value: enteredValue,
        valueIsValid: valueIsValid,
        hasError: hasError,
        resetInput,
        valueChangeHandler,
        valueBlurHandler,
        initialValueHandler
    }
}

export default useInput;