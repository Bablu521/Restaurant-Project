import { Router } from "express";
const router = Router()
import * as couponController from './coupon.controller.js'
import * as couponSchema from './coupon.schema.js'
import { validation } from '../../middlewares/validation.js'
import { isAuthenticated } from './../../middlewares/authentication.js';
import { isAuthorized } from './../../middlewares/authorization.js';

//createCoupon
router.post("/", isAuthenticated, isAuthorized("rest-owner"), validation(couponSchema.createCoupon), couponController.createCoupon);

//updateCoupon
router.put("/:id", isAuthenticated, isAuthorized("rest-owner"), validation(couponSchema.updateCoupon), couponController.updateCoupon)

//deleteCoupon
router.delete("/:id", isAuthenticated, isAuthorized("rest-owner"), validation(couponSchema.deleteCoupon), couponController.deleteCoupon)

//getAllCoupons
router.get("/", isAuthenticated, isAuthorized("rest-owner", "admin"), couponController.getAllCoupons)

export default router