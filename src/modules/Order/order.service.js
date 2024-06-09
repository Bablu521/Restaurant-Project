import cartModel from "../../../DB/models/Cart.model.js"

export const clearCart = async(userId)=>{
    await cartModel.findOneAndUpdate({ userId }, { foods: [] }, { new: true })
}