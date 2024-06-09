import { asyncHandler } from "../../utils/errorHandling.js";
import categoryModel from './../../../DB/models/Category.model.js';
import cloudinary from './../../utils/cloudinary.js';
import restaurantModel from './../../../DB/models/Restaurant.model.js';

//createReastaurant
export const createReastaurant = asyncHandler(async (req, res, next) => {
    const categories = req.body.categoryId
    for (let i = 0; i < categories.length; i++) {
        const category = await categoryModel.findById({ _id: categories[i] })
        if (!category) {
            return next(new Error("Category Not Found", { cause: 404 }))
        }
    }
    const checkTitle = await restaurantModel.findOne({ title: req.body.title.toLowerCase() })
    if (checkTitle) {
        return next(new Error("Restaurant with this title already exists", { cause: 409 }))
    }
    const checkPhone = await restaurantModel.findOne({ phone: req.body.phone })
    if (checkPhone) {
        return next(new Error("Phone already exists", { cause: 409 }))
    }
    if (!req.file) {
        return next(new Error("Restaurant Image is required", { cause: 404 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "Restaurant/Restaurant-Logo" })
    const restaurant = await restaurantModel.create({
        ...req.body,
        image: { url: secure_url, id: public_id },
        owner: req.user._id
    })
    return res.status(201).json({ message: "Done", restaurant })
})


//updateReastaurant
export const updateReastaurant = asyncHandler(async (req, res, next) => {
    const restaurant = await restaurantModel.findOne({ _id: req.params.id, owner: req.user._id })
    if (!restaurant) {
        return next(new Error("Restaurant Not Found Or you are not allowed to Update", { cause: 403 }))
    }
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { public_id: restaurant.image.id })
        restaurant.image = { url: secure_url, id: public_id }
    }
    if (req.body.title) {
        const checkTitle = await restaurantModel.findOne({ title: req.body.title.toLowerCase() })
        if (checkTitle) {
            return next(new Error("Restaurant with this title already exists", { cause: 409 }))
        }
        restaurant.title = req.body.title.toLowerCase()
    }
    if (req.body.phone) {
        const checkPhone = await restaurantModel.findOne({ phone: req.body.phone })
        if (checkPhone) {
            return next(new Error("Phone already exists", { cause: 409 }))
        }
        restaurant.phone = req.body.phone
    }
    restaurant.description = req.body.description ? req.body.description : restaurant.description
    restaurant.location = req.body.location ? req.body.location : restaurant.location
    restaurant.workingTime = req.body.workingTime ? req.body.workingTime : restaurant.workingTime
    restaurant.pickUp = req.body.pickUp ? req.body.pickUp : restaurant.pickUp
    restaurant.delivery = req.body.delivery ? req.body.delivery : restaurant.delivery
    await restaurant.save()
    return res.status(200).json({ message: "Done", restaurant })
})

//deleteReastaurant
export const deleteReastaurant = asyncHandler(async (req, res, next) => {
    const restaurant = await restaurantModel.findOne({ _id: req.params.id, owner: req.user._id })
    if (!restaurant) {
        return next(new Error("Restaurant Not Found Or you are not allowed to Delete", { cause: 403 }))
    }
    await restaurant.deleteOne()
    await cloudinary.uploader.destroy(restaurant.image.id)
    return res.status(200).json({ message: "Done" })
})

//getAllRestaurants
export const getAllRestaurants = asyncHandler(async (req, res, next) => {
    const restaurants = await restaurantModel.find().populate([
        {
            path: "categoryId",
            select: "title -_id"
        },
        {
            path: "foods",
            select: "title -_id"
        }
    ])

    if (!restaurants.length) {
        return next(new Error("No Restaurant Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", restaurants })
})


//searchRestaurant
export const searchRestaurant = asyncHandler(async (req, res, next) => {
    const { keyword } = req.query
    const restaurants = await restaurantModel.find({ title: { $regex: keyword, $options: "i" } })
    if (!restaurants.length) {
        return next(new Error("No Restaurant Found", { cause: 404 }))
    }
    return res.status(200).json({ message: "Done", restaurants })
})
