import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(403)
        .json({ success: false, message: "Token not valid" });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default verifyUser;
