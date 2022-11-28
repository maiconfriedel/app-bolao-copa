import Joi from "joi";

export const UserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string().uri().optional(),
});
