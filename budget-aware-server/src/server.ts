import app from "./app";
import "./config/dotenv";
import connectDB from "./config/db";
import { PORT } from "./config/dotenv";
import { logger } from "./utils/logger";


connectDB().then(() => {
  app.listen(PORT || 3000, () => logger.info("Server running"));
  
});
