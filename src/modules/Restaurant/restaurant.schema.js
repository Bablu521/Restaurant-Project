import joi from 'joi';
import { validObjectId } from '../../middlewares/validation.js';

//createRestaurant
export const createReastaurant = joi.object({
    title: joi.string().min(2).max(20).required(),
    description: joi.string().min(10).max(100),
    categoryId: joi.array().items(joi.string().custom(validObjectId).required()).required(),
    workingTime: joi.string(),
    pickUp: joi.boolean(),
    delievery: joi.boolean(),
    location: joi.string().min(5).max(100),
    phone: joi.string().required()
}).required()

//updateReastaurant
export const updateReastaurant = joi.object({
    id: joi.string().custom(validObjectId).required(),
    title: joi.string().min(2).max(20),
    description: joi.string().min(10).max(100),
    workingTime: joi.string(),
    pickUp: joi.boolean(),
    delievery: joi.boolean(),
    location: joi.string().min(5).max(100),
    phone: joi.string()
}).required()

//deleteReastaurant
export const deleteReastaurant = joi.object({
    id: joi.string().custom(validObjectId).required(),
}).required()

//searchRestaurant
export const searchRestaurant = joi.object({
    keyword: joi.string().required()
}).required()