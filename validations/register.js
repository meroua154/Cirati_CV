const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Converting empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
    
    // data.bio = !isEmpty(data.bio) ? data.bio : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Role checks
    if (Validator.isEmpty(data.role)) {
        errors.role = "Select Role";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 128 })) {
        errors.password = "Password must be at least 6 and less than 128 characters.";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    // Location checks
    if (Validator.isEmpty(data.localisation)) {
        errors.location = "localisation field is required";
    }

    // Phone number checks
    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = "Phone number field is required";
    }

    // Bio checks
    // if (Validator.isEmpty(data.bio)) {
    //     errors.bio = "Bio field is required";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
