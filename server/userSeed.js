import dotenv from "dotenv";
dotenv.config();

import "colors";
import bcrypt from "bcrypt";
import User from "./models/userModel.js";
import connectDB from "./database/database.js";

const userRegister = async () => {
  connectDB();
  try {
    const hashedPassword = await bcrypt.hash("123Nepal123", 10);
    const newUser = new User({
      name: "Prabal Bhandary",
      email: "prabalbhandary97@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
    const user = await newUser.save();
    console.log(
      `User created with id: ${user._id} and name: ${user.name} Successfully`
        .bgGreen.white
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.white);
  }
};

userRegister();
