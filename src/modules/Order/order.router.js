import { Router } from "express";
const router = Router()
import * as orderController from './order.controller.js'
import * as orderSchema from './order.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';
import express from 'express';

//createCashOrder
router.post("/cash", isAuthenticated, isAuthorized("client"), validation(orderSchema.createCashOrder), orderController.createCashOrder)

//createVisaOrder
router.post("/visa", isAuthenticated, isAuthorized("client"), validation(orderSchema.createVisaOrder), orderController.createVisaOrder)

//orderWebhook
router.post("/orderWebhook", express.raw({ type: 'application/json' }), orderController.orderWebhook)

//cancelOrder
router.patch("/:id", isAuthenticated, isAuthorized("client"), validation(orderSchema.cancelOrder), orderController.cancelOrder)



export default router