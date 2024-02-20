const Joi = require("joi")


const joiUserSchema = Joi.object({

    name: Joi.string(),
    email: Joi.string().email().required(),
    username: Joi.string().alphanum(),
    password: Joi.string().min(4).max(8).required(),

})

const joiProductSchema = Joi.object({

    name: Joi.string(),
    category:Joi.string(),
    imageUrl:Joi.string(),
    price:Joi.number(),

})

module.exports= {joiUserSchema, joiProductSchema}