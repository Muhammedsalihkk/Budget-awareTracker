import mongoose from "mongoose";
import { MONGO_URI } from "./dotenv";
import { logger } from "../utils/logger";

const connectDB = async (): Promise<void> => {

  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (error: any) {
    logger.error("Error connecting to MongoDB");
  }
};

export default connectDB;
