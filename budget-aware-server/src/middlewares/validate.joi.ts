import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { sendError } from "../utils/response";
import { logger } from "../utils/logger";

export const validateJoi = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if(req.body==undefined){
        
        logger.info("Request body is undefined");
        sendError(res,"Invalid request body",400)
        return;
    };
    const { error } = schema.validate(req.body);
    if (error) {
      const messages = error.details.map((detail) => detail.message.replace(/"/g, ""));
     sendError(res, messages.join(", "), 400);
      return;
    }
    next();
  };
};
