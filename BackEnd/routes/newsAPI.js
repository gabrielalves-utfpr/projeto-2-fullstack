const express = require('express')
const router = express.Router()
const NewsModel = require('../models/news')
const newsValidator = require('../validators/newsValidator')
const {sucess, fail} = require("../helpers/resposta")
const auth = require('../helpers/auth')

router.get('/search', auth.authenticate, (req, res) => {
    //parametro
    const term = req.query.term

    if (term != null && term != ''){
        NewsModel.search(term).then(news =>{
            if (news != null){
                res.json({status: true, news: news})
            } else{
                res.status(400).json(fail("Noticia não encontrado"))
            }
        }).catch(erro => {
            res.status(400).json(fail("Erro ao solicitar Noticia:" + erro.message))

        })
    } else {
        res.status(416).json(fail("Title não informado"))
    }
})

router.post('/', newsValidator.validateNews, auth.authenticate, (req, res) => {
    NewsModel.save(req.body).then(news => {
        res.json(sucess("Noticia'"+news.title+"' Cadastrado"))
    }).catch(erro => {
        res.status(401).json(fail("Falha ao Cadastrar"))
    })
})