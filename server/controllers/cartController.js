import User from "../models/User.js"

//Update User CartData : /api/cart/update

export const updateCart = async (req, res)=> {
   try {
     const { cartItems } = req.body
     const userId = req.user  // Get userId from authenticated middleware
     
     const updatedUser = await User.findByIdAndUpdate(userId, {cartItems}, {new: true})
     res.json({ success: true, message: "Cart Updated", user: updatedUser})
   } catch (error) {
      console.log(error.message)
      res.json({ success: false, message: error.message })
   }
}