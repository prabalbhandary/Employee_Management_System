import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields are required. Please kindly fill it",
        });
    }
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { changePassword };
