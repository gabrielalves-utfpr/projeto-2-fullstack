const Joi = require("joi")

const SearchModel = require('../models/search')

const SearchSchema = Joi.object({
    term: Joi.string()
        .min(1)
        .required(),
})

module.exports = {
    validateSearch: function(req, res,next){
        term = req.query.term
        const {error, value} = SearchSchema.validate({term: term});
        if(error){
            return res.status(400).json({status: false, message: "Termo Invalido ou Nulo", m2: error})
        }
        SearchModel.save({userId: req.user.id, term: term}).then(search =>{
            console.log("Search (TERMO: "+term+") Registro Salvo")
        }).catch(err => {
            console.log("Search Registro NÃO Salvo")
        })
        return next()
    },
}