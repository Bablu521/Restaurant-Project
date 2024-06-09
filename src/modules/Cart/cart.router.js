import { Router } from "express";
const router = Router()
import * as cartController from './cart.controller.js'
import * as cartSchema from './cart.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';

//addToCart
router.post("/", isAuthenticated, isAuthorized("client"), validation(cartSchema.addToCart), cartController.addToCart)

//updateCart
router.patch("/", isAuthenticated, isAuthorized("client"), validation(cartSchema.updateCart), cartController.updateCart)

//removeFromCart
router.put("/", isAuthenticated, isAuthorized("client"), validation(cartSchema.removeFromCart), cartController.removeFromCart)

//clearCart
router.put("/clear", isAuthenticated, isAuthorized("client"), cartController.clearCart)

//getCart
router.get('/', isAuthenticated, isAuthorized("client", "admin"), validation(cartSchema.getCart), cartController.getCart)



export default router