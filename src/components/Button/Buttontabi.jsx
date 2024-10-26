import React from 'react'
// import classes from "./buttontabi.module.css"

// buttonClass available:
// logo, light, secondary, warning, danger

// types available: 
// button, submit, etc

const Buttontabi = ({ type, buttonClass, onClick, title, extras, ...props }) => {

  // The "light" button was given a drastically different, more 'basic' look and doesn't set btn
  let buttonExtras = extras || "";
  if (!buttonClass.includes('light')){
    buttonExtras += " btn"
  }


  return (
    <button
      type={type}
      // className={`mx-1 ${classes[`btn-tabi-${buttonClass}`]} ${extras}`}
      className={`mx-1 btn-tabi-${buttonClass} ${buttonExtras}`}
      onClick={onClick} 
      {...props}
    >
      {title || "Button"}
    </button>
  )
}

export default Buttontabi