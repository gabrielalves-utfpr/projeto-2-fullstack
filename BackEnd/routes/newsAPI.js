const express = require('express')
const router = express.Router()
const NewsModel = require('../models/news')
const newsValidator = require('../validators/newsValidator')
const searchValidator = require('../validators/searchValidator')
const {sucess, fail} = require("../helpers/resposta")
const auth = require('../helpers/auth')
const cache = require('express-redis-cache')()

cache.invalidate = (name) => {
    return (req, res, next) => {
      const route_name = name ? name : '/news?*';
      if (!cache.connected) {
        next();
        return ;
      }
      cache.del(route_name, (err) => console.log(err));
      next();
    };
  };

router.get('/', auth.authenticate, searchValidator.validateSearch, cache.route({expire: 20}), async (req, res) => {
    //parametro
    const term = req.query.term
    if (term != null && term != ''){
        console.log("SEM CACHE")
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

router.post('/', newsValidator.validateNews, auth.authenticate, cache.invalidate(), async (req, res) => {
    NewsModel.save(req.body).then(news => {
        amqp.connect('amqp://localhost', (err, conn) => {
            if (err) {
                throw err;
            }

            conn.createChannel((err, ch) => {
                if (err) {
                    throw err;
                }

                let queue = 'notificationQueue:';
                let msg = JSON.stringify(news);

                ch.assertQueue(queue, { durable: false });
                ch.sendToQueue(queue, Buffer.from(msg));

                console.log(" ["+req.user.id+"] enviou %s"+msg);
            });
        });
        res.json(sucess("Noticia'"+news.title+"' Cadastrado"))
    }).catch(erro => {
        res.status(401).json(fail("Falha ao Cadastrar"))
    })
})
module.exports = router