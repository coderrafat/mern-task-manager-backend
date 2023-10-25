const { userRegisterController, userLogincontroller, otpSendController, otpVerifyController, userLogoutcontroller, userProfilecontroller, userProfileUpdateController, userPasswordUpdateController } = require('../controllers/userController');
const { isLogin } = require('../middlewares/auth');

const userRouter = require('express').Router();

userRouter.post('/user/register', userRegisterController);

userRouter.post('/user/otp-send', otpSendController);

userRouter.get('/user/otp-verify', otpVerifyController);

userRouter.post('/user/login', userLogincontroller);

userRouter.get('/user/logout', userLogoutcontroller);

userRouter.get('/user/profile', isLogin, userProfilecontroller);

userRouter.post('/user/profile/update', isLogin, userProfileUpdateController);

userRouter.post('/user/password/update', isLogin, userPasswordUpdateController);

module.exports = userRouter;