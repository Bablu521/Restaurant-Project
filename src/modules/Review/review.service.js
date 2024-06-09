import foodModel from "../../../DB/models/Food.model.js"
import restaurantModel from "../../../DB/models/Restaurant.model.js"
import reviewModel from "../../../DB/models/Review.model.js"


export const calcuateRating = async (foodId) => {
    const food = await foodModel.findById(foodId)
    const reviews = await reviewModel.find({ foodId })
    const restaurant = await restaurantModel.findById(food.restaurantId)
    let calcFoodRating = 0
    let calcRestaurantRating = 0
    for (let i = 0; i < reviews.length; i++) {
        calcFoodRating += reviews[i].foodRating
        calcRestaurantRating += reviews[i].restaurantRating
    }
    food.rating = calcFoodRating / reviews.length
    await food.save()
    restaurant.rating = calcRestaurantRating / reviews.length
    await restaurant.save()
}