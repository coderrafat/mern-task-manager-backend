const { userRegisterService, userLoginService, otpSendService, otpVerifyService, userLogoutService, userProfileService, userProfileUpdateService, userPasswordUpdateService } = require("../services/userService");

exports.userRegisterController = async (req, res, next) => {
    try {
        const {
            firstName, lastName, email, phone, photo, password, confirmPassword
        } = req.body;

        const result = await userRegisterService(
            firstName, lastName, email, phone, photo, password, confirmPassword
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

exports.otpSendController = async (req, res, next) => {
    try {
        const { email, emailSubject } = req.body;

        const result = await otpSendService(email, emailSubject);

        res.status(200).json(result)

    } catch (error) {
        next(error);
    }
};

exports.otpVerifyController = async (req, res, next) => {
    try {
        const { email, emailSubject, otp } = req.query;

        const result = await otpVerifyService(email, emailSubject, otp);

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

exports.userLogincontroller = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await userLoginService(email, password)

        if (result.status === 'success') {
            return res.cookie('token', result.token).status(200).json(result);

        } else {
            return res.json({ error: "something went wrong" })
        }


    } catch (error) {
        next(error);
    }
};

exports.userLogoutcontroller = async (req, res, next) => {
    try {
        const result = await userLogoutService()

        if (result.status === 'success') {
            return res.clearCookie('token').status(200).json(result);

        } else {
            return res.json({ error: "something went wrong" })
        }


    } catch (error) {
        next(error);
    }
};

exports.userProfilecontroller = async (req, res, next) => {
    try {
        const { id } = req.headers;

        const result = await userProfileService(id);

        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};

exports.userProfileUpdateController = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;

        const { id } = req.headers;

        const result = await userProfileUpdateService(firstName, lastName, id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.userPasswordUpdateController = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const { email } = req.headers;

        const result = await userPasswordUpdateService(
            email, currentPassword, newPassword, confirmPassword
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}