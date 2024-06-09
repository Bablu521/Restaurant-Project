import { asyncHandler } from './../../utils/errorHandling.js';
import foodModel from './../../../DB/models/Food.model.js';
import cartModel from './../../../DB/models/Cart.model.js';

//addToCart
export const addToCart = asyncHandler(async (req, res, next) => {
    const { foodId, quantity } = req.body
    const food = await foodModel.findById(foodId)
    if (!food) {
        return next(new Error("Food Not Found", { cause: 404 }))
    }
    const foodInCart = await cartModel.findOne({ userId: req.user._id, "foods.foodId": foodId })
    if (foodInCart) {
        const isFood = foodInCart.foods.find((food) => food.foodId.toString() == foodId.toString())
        isFood.quantity = isFood.quantity + quantity
        await foodInCart.save()
        return res.status(201).json({ message: "Done", foodInCart })
    }
    const cart = await cartModel.findOneAndUpdate({ userId: req.user._id }, { $push: { foods: { foodId, quantity } } }, { new: true })
    return res.status(201).json({ message: "Done", cart })
})


//updateCart
export const updateCart = asyncHandler(async (req, res, next) => {
    const { foodId, quantity } = req.body
    const food = await foodModel.findById(foodId)
    if (!food) {
        return next(new Error("Food Not Found", { cause: 404 }))
    }
    const cart = await cartModel.findOneAndUpdate({ userId: req.user._id, "foods.foodId": foodId }, { "foods.$.quantity": quantity }, { new: true })
    if (!cart) {
        return next(new Error("Food Not Exist In Cart", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", cart })
})

//removeFromCart
export const removeFromCart = asyncHandler(async (req, res, next) => {
    const { foodId } = req.body
    const food = await foodModel.findById(foodId)
    if (!food) {
        return next(new Error("Food Not Found", { cause: 404 }))
    }
    const cart = await cartModel.findOneAndUpdate({ userId: req.user._id, "foods.foodId": foodId }, { $pull: { foods: { foodId } } })
    if (!cart) {
        return next(new Error("Food Already Not Exist In Cart", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", cart })
})

//clearCart
export const clearCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOneAndUpdate({ userId: req.user._id }, { foods: [] }, { new: true })
    return res.status(200).json({ message: "Done" })
})


//getCart
export const getCart = asyncHandler(async (req, res, next) => {
    if (req.user.role == "client") {
        const cart = await cartModel.findOne({ userId: req.user._id })
        return res.status(200).json({ message: "Done", cart })
    }
    if (req.user.role == "admin" && !req.body.cartId) {
        return next(new Error("Cart Id Is Required", { cause: 404 }))
    }
    const cart = await cartModel.findById(req.body.cartId)
    return res.status(200).json({ message: "Done", cart })
})
