import joi from 'joi';

//signUp
export const signUp = joi.object({
    userName: joi.string().required().min(3).max(30),
    address: joi.string().min(10).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    phone: joi.string().required()
}).required()

//logIn
export const logIn = joi.object({
    userData: joi.string().required(),
    password: joi.string().required(),
}).required()


//update_account
export const update_account = joi.object({
    userName: joi.string().min(3).max(30),
    address: joi.string().min(10).max(100),
    password: joi.string(),
    email: joi.string().email(),
    phone: joi.string()
}).required()


//updatePassword
export const updatePassword = joi.object({
    oldPassword: joi.string().required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref("password")).required()
}).required()


//generateOTP
export const generateOTP = joi.object({
    email: joi.string().email().required()
}).required()


//resetPassword
export const resetPassword = joi.object({
    email: joi.string().email().required(),
    OTP: joi.number().required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref("password")).required()
}).required()
