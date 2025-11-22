import express from "express";
import router from "./routers";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { CLIENT_URL } from "./config/dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorHandler);

export default app;
