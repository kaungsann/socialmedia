const Joi = require("joi");

module.exports = {
  userData: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(12).required(),
    password: Joi.string().min(8).max(21).required(),
  }),
  id: Joi.object({
    id: Joi.string()
      .regex(/^[0-9A-Fa-f]{24}$/)
      .required(),
  }),
  tagSchema: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    name: Joi.string().required(),
    user: Joi.optional(),
  }),
  commentSchema: Joi.object({
    postId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    name: Joi.string().required(),
    image: Joi.string(),
    content: Joi.string().required(),
    user: Joi.optional(),
  }),

  userPost: Joi.object({
    content: Joi.string().required(),
    image: Joi.string(),
    user: Joi.optional(),
  }),
  page: Joi.object({
    page: Joi.number().required(),
  }),
};
