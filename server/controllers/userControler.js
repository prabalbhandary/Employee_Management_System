import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields are required. Please kindly fill it",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found. Please register first",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid Credentials. Please try again",
        });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: `Welcome Back, ${user.name}`,
        token,
        user: { _id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const verifyController = (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "Verified user fetched successfully",
      user: req.user,
    });
};

export { loginController, verifyController };
