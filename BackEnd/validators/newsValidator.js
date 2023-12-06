const Joi = require("joi")

const NewsSchema = Joi.object({
    id: Joi.number()
        .integer(),
    title: Joi.string()
        .min(2)
        .required(),
    image: Joi.string()
        .min(2),
})

module.exports = {
    validateNews: function(req, res,next){
        const {error, value} = NewsSchema.validate(req.body);
        if(error){
            return res.status(400).json({status: false, message: "Titulo Invalido ou Nulo", m2: error})
        }
        req.body = value
        return next()
    },
}