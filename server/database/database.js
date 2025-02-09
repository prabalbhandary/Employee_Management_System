import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.white);
  }
};

export default connectDB;
