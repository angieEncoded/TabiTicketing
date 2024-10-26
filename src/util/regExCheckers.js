// REQUIRED CHECKS
//=============================================================
const requiredNameCheck = (value) => {
    const re = /^[a-zA-Z0-9._-\s]+$/
    return re.test(value.trim())
}

const requiredPasswordCheck = (value) => {
    const re = /^[a-zA-Z0-9._-\s]+$/
    return re.test(value.trim())
}

const requiredTwoEfAyCheck = (value) => {
    const re = /^[0-9\s]+$/
    return re.test(value.trim())
}

const requiredCityStateCheck = value => {
    const re = /^[a-zA-Z0-9._-\s]+$/
    return re.test(value.trim())
}

const requiredAddressCheck = (value) => {
    const re = /^[a-zA-Z0-9._-\s]+$/
    return re.test(value.trim())
}

const requiredPhoneCheck = (value) => {
    const re = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    return re.test(value.trim())
}

const requiredEmailCheck = (value) => {
    // generic email format
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(value)
}

const requiredZipCheck = (value) => {
    const re = /^[0-9]{5}(?:-[0-9]{4})?$/
    return re.test(value.trim())
}

const requiredDateCheck = (value) => {
    // is this format consistent across broswers????s
    const re = /^[0-9]{4}[/-][0-9]{2}[/-][0-9]{2}$/
    return re.test(value.toString().trim())
}



// OPTIONAL CHECKS
//=============================================================
const optionalTextcheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^[a-zA-Z0-9._-\s]+$/
        return re.test(value.toString().trim())
    }
}

const optionalMiddleInitialCheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^[a-zA-Z0-9._-\s]{1}$/
        return re.test(value.trim())
    }
}

const optionalCityStateCheck = value => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^[a-zA-Z0-9._-\s]+$/
        return re.test(value.trim())
    }
}

const optionalAddressCheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^[a-zA-Z0-9._-\s]+$/
        return re.test(value.trim())
    }
}

const optionalZipCheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^[0-9]{5}(?:-[0-9]{4})?$/
        return re.test(value.trim())
    }
}

const optionalPhoneCheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        const re = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
        return re.test(value.trim())
    }
}

const optionalEmailCheck = (value) => {
    if (value.trim() === "") {
        return true;
    } else {
        // generic email format
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return re.test(value)
    }
}

// OTHER CHECKS
//=============================================================
const checkboxCheck = (value) => {
    // we only expect a true or false value from these inputs
    if (value === true || value === false) {
        // console.log(`returned ${value}`)
        return true
    } else {
        return false;
    }
}

export {
    requiredNameCheck, requiredCityStateCheck, requiredAddressCheck, requiredPhoneCheck, requiredEmailCheck, requiredZipCheck, requiredDateCheck, requiredPasswordCheck, requiredTwoEfAyCheck,
    optionalTextcheck, optionalMiddleInitialCheck,optionalCityStateCheck, optionalAddressCheck, optionalZipCheck,optionalPhoneCheck, optionalEmailCheck,
    checkboxCheck
}
