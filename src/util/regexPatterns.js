// Basic regex patterns for 

const regexPatterns = {
        zip: /^[0-9]{5}(?:-[0-9]{4})?$/,
        alphaNumeric: /^[a-zA-Z0-9._-\s]+$/,
        phone: /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        date: /^[0-9]{4}[/-][0-9]{2}[/-][0-9]{2}$/,
        website: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/,
        middleInitial: /^[a-zA-Z0-9._-\s]{1}$/
    }

export default regexPatterns;