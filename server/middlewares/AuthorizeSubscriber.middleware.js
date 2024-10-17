import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authorizeSubscriber = async (req, res, next) => {
  const { role, id } = req.user;
  const user = await userModel.findById(id);
  const subscriptionStatus = user.subscription.status;
  // const user=await User.findById(req.user.id) ;
  if (role !== "ADMIN" && subscriptionStatus !== "active") {
    return next(new AppError("Please subscribce to access this route!", 403));
  }

  next();
};

export default authorizeSubscriber;
