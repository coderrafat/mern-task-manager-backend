const { ValidationError } = require('custom-error-handlers/error');

//!User Validation
exports.userRegisterValidation = (firstName, lastName, email, phone, photo, password, confirmPassword) => {

    if (!firstName) {
        throw new ValidationError('First Name is required');
    }
    if (!lastName) {
        throw new ValidationError('Last Name is required');
    }
    if (!email) {
        throw new ValidationError('Email is required');
    }
    if (!phone) {
        throw new ValidationError('Phone Number is required');
    }
    if (!photo) {
        throw new ValidationError('Profile Picture is required');
    }
    if (!password) {
        throw new ValidationError('Password is required');
    }
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters');
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required');
    }
    if (password !== confirmPassword) {
        throw new ValidationError('Password and Confirm Password must be the same');
    }

};

exports.userLoginValidation = (email, password) => {
    if (!email) {
        throw new ValidationError('Email Name is required');
    }
    if (!password) {
        throw new ValidationError('Password is required');
    }
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters');
    }
};

exports.userUpdatePasswordValidation = (currentPassword, newPassword, confirmPassword) => {
    if (!currentPassword) {
        throw new ValidationError('Current Password is required');
    }
    if (!newPassword) {
        throw new ValidationError('New Password is required');
    }
    if (newPassword.length < 6) {
        throw new ValidationError('New Password must be at least 6 characters');
    }
    if (!confirmPassword) {
        throw new ValidationError('Confirm Password is required');
    }
    if (newPassword !== confirmPassword) {
        throw new ValidationError('New Password and Confirm Password  must be the same');
    }

};



//!Task Validation
exports.taskCreateValidation = (title, description) => {
    if (!title) {
        throw new ValidationError('Title is required');
    }
    if (!description) {
        throw new ValidationError('Title is required');
    }
}