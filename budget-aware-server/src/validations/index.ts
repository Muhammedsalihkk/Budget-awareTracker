import Joi from "joi";

export const validations = {
  auth: {
    register: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmpassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "passwords do not match",
        }),
    }),

    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },

  category: Joi.object({
    name: Joi.string().required(),
    color: Joi.string()
      .pattern(/^#([0-9A-F]{3}){1,2}$/i)
      .optional(),
  }),

  budget: Joi.object({
    category: Joi.string().hex().length(24).required(),
    amount: Joi.number().positive().required(),
    month: Joi.string()
      .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
      .required(),
  }),

  expense: Joi.object({
    category: Joi.string().hex().length(24).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
  }),
};
