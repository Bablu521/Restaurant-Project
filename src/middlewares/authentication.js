import userModel from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    const {token} = req.headers
    if(!token?.startsWith(process.env.BEARER_KEY)){
        return next(new Error("INVALID TOKEN",{cause:404}))
    }
    const payload = token.split(process.env.BEARER_KEY)[1]
    const decoded = jwt.verify(payload , process.env.TOKEN_SIGNATURE)
    if (!decoded?.id){
        return next(new Error("INVALID TOKEN PAYLOAD",{cause:400}))
    }
    const user = await userModel.findById(decoded.id)
    if(!user){
        return next(new Error("USER NOT FOUND",{cause:404}))
    }
    if (user.status != "online"){
        return next(new Error("Please LOGIN FIRST",{cause:403}))
    }
    req.user = user
    return next()
})