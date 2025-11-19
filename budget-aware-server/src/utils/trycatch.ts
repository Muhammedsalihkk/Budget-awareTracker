import {Request, Response,NextFunction} from "express"
import { ControllerFunction } from "../types";
import { logger } from "./logger";



const tryCatch = (controller: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      logger.error(`Error in controller:${error.message}`);
      next(error);
    }
  };
 export default tryCatch  