import { Router } from "express";
const router = Router()
import * as authController from './auth.controller.js'
import * as authSchema from './auth.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';

//signUp
router.post('/signUp', validation(authSchema.signUp), authController.signUp)

//activate_account
router.get('/activate_account/:token', authController.activate_account)

//logIn
router.get('/logIn', validation(authSchema.logIn), authController.logIn)

//update_account
router.put('/update_account', isAuthenticated, isAuthorized("client"), validation(authSchema.update_account), authController.update_account)

//delete_account
router.delete('/delete_account', isAuthenticated, isAuthorized("client"), authController.delete_account)


//updatePassword 
router.patch('/updatePassword', isAuthenticated, isAuthorized("client"), validation(authSchema.updatePassword), authController.updatePassword)

//generateOTP
router.patch('/OTP', validation(authSchema.generateOTP), authController.generateOTP)

//resetPassword
router.put('/resetPassword', validation(authSchema.resetPassword), authController.resetPassword)


//getProfile
router.get('/:id', isAuthenticated, isAuthorized("admin"), authController.getProfile)


export default router