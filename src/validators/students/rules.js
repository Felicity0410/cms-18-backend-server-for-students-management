const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    code: Joi.string.regex(/^[a-zA-Z]+[0-9]+$/).required(),
    description: Joi.string()
})

const {code, name, description} = schema.validateAsync(req.body, {allowUnknown: true, stripUnknown: true})

