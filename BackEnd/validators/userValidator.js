const Joi = require("joi")

const UserSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    username: Joi.string()
        .min(2)
        .required()
        .max(20),
    password: Joi.string()
        .min(2)
        .required()
        .max(20),
})

module.exports = {
    validateUser: function(req, res,next){
        const {error, value} = UserSchema.validate(req.body);
        if(error){
            return res.status(400).json({status: false, message: "User/Password Incompletos/Errados", m2: error})
        }
        req.body = value
        return next()
    },
}