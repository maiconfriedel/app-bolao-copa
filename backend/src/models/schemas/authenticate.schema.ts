import Joi from "joi";

export const AuthenticateSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const RefreshTokenSchema = Joi.object().keys({
  refresh_token: Joi.string().required(),
});
