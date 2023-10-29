const { createToken } = require("../config/createToken");
const SendEmail = require("../config/sendEmail");
const { generateSignInOtpTemplate } = require("../mails");
const userModel = require("../models/userModel");
const { userRegisterValidation, userLoginValidation, userUpdatePasswordValidation } = require("../validation/validation");
const bcrypt = require("bcrypt");
const { ValidationError, NotFoundError } = require('custom-error-handlers/error');


//!User Registration Service
exports.userRegisterService = async (
    firstName, lastName, email, phone, photo, password, confirmPassword
) => {

    //!Call User Register Validation Function
    userRegisterValidation(
        firstName, lastName, email, phone, photo, password, confirmPassword
    );

    //!Check Existing Email
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
        throw new ValidationError('Email already exists')
    }

    //!Check Existing Phone Number
    const existingPhone = await userModel.findOne({ phone });

    if (existingPhone) {
        throw new ValidationError('Phone Number already exists')
    }

    //!Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    //!Create a new User Account
    await userModel.create({
        firstName,
        lastName,
        email,
        phone,
        photo,
        password: hashedPassword
    });

    return { status: 'success', massage: 'Your Account has been Created!' }
};

//!User Verify Otp Send Service
exports.otpSendService = async (email, emailSubject) => {

    //!Create Random OTP Code
    const otp = Math.floor(100000 + Math.random() * 900000)

    if (!email) {
        throw new ValidationError('Email is required')
    }

    //!Check Existing User
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new NotFoundError('User Not Found')
    }

    //!Save Otp in Database
    await userModel.findOneAndUpdate({ email }, { 'otp.code': otp })

    //!Create Email Data For Send Email
    const emailData = {
        to: email,
        subject: emailSubject,
        html: generateSignInOtpTemplate(email, otp)
    }

    //!Call send Email Function
    await SendEmail(emailData)

    return { status: 'success', massage: 'Email has been Sent' }

};

//!User Verify Service
exports.otpVerifyService = async (email, emailSubject, otp) => {

    if (!email) {
        throw new ValidationError('Email is required')
    }
    if (!emailSubject) {
        throw new ValidationError('Email Subject is required')
    }
    if (!otp) {
        throw new ValidationError('Otp is required')
    }

    const user = await userModel.findOne({ email, 'otp.code': otp });

    if (!user) {
        throw new ValidationError('The OTP you provided is incorrect.');
    }

    const checkExpire = new Date().getTime() - user.updatedAt;
    const expireTime = Math.floor(checkExpire / 1000);

    if (expireTime > 300) {
        throw new ValidationError('OTP is Expired. Please try again!')
    }

    await userModel.findOneAndUpdate(
        { email },
        { 'otp.code': '0', status: 'verified', 'otp.type': emailSubject }
    )

    return { status: 'success', massage: 'Otp Verify Success' }
};

//!User Login Service
exports.userLoginService = async (email, password) => {

    userLoginValidation(email, password);

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new NotFoundError('User Not Found')
    }

    if (user.status === 'unverified') {
        throw new ValidationError('Your Email is not verified')
    }

    const checkPassword = await bcrypt.compare(password, user?.password);

    if (!checkPassword) {
        throw new ValidationError('Email or Password incorrect')
    }

    const token = await createToken(
        user.email, user._id, process.env.JWT_EXPIRES
    );

    return {
        status: 'success',
        massage: 'Login Success',
        data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phone,
            photo: user.photo
        },
        token
    }
};

//!User Logout Service
exports.userLogoutService = async () => {
    return { status: 'success', massage: 'Logout Success' }
};

//!User Profile Service
exports.userProfileService = async (id) => {

    const user = await userModel.findById(id,
        { otp: 0, _id: 0, password: 0, createdAt: 0, updatedAt: 0 });

    if (!user) {
        throw new NotFoundError('User Not Found');
    }

    return { status: 'success', data: user }
};

//!User Profile Update Service
exports.userProfileUpdateService = async (id, firstName, lastName) => {
    if (!firstName || !lastName) {
        throw new ValidationError('required field is empty')
    }

    await userModel.findByIdAndUpdate(id, { firstName, lastName });

    return { status: 'success', massage: 'Profile has been updated!' }
};

//!User Password Update Service
exports.userPasswordUpdateService = async (email, currentPassword, newPassword, confirmPassword) => {

    userUpdatePasswordValidation(currentPassword, newPassword, confirmPassword);

    const user = await userModel.findOne({ email });

    const checkPassword = await bcrypt.compare(currentPassword, user.password);

    if (!checkPassword) {
        throw new ValidationError('Current Password is incorrect')
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await userModel.findOneAndUpdate({ email }, { password: hashedNewPassword })

    return { status: 'success', massage: 'Password Save Changed!' }

};


