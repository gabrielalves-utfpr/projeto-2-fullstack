const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    authenticate: async function(req, res, next){
        let reqbearer = req.headers['authorization']
        if (reqbearer != null && reqbearer != undefined){
            let bearer = reqbearer.split(' ')
            if (bearer[0] != 'Bearer') {
                return res.status(400).json({status:false, mensagem:"Não à Bearer"})
            }
            jwt.verify(bearer[1], process.env.SECRET, (erro, user) =>{
                if(erro){
                        return res.status(401).json({status:false, mensagem:erro.name})
                }
                req.user = user
            })
            if(req.user != null){
                let user = await UserModel.isRegistered({username: req.user.username, password: req.user.password})
                if (user != null){
                    req.user.id = user.id
                    next()
                }else{
                    return res.status(401).json({status:false, mensagem:'Credenciais erradas'})
                }
            }
        }else {
            return res.status(401).json({status:false, mensagem:'Credenciais não encontradas'})
        }
    },
    authenticateWS: async function(req, res, next){
        try {
          const url = require('url');
          // analisar o req.url e obter o token da query string
          let reqbearer = url.parse(req.url, true).query.authorization;
          if (reqbearer != null && reqbearer != undefined){
            let bearer = reqbearer.split(' ')
            if (bearer[0] != 'Bearer') {
              throw {status:false, mensagem:"Não à Bearer"}
            }
            const user = await jwt.verify(bearer[1], process.env.SECRET);
            req.user = user;
            if(req.user != null){
              let user = await UserModel.isRegistered({username: req.user.username, password: req.user.password})
              if (user != null){
                req.user.id = user.id
                next()
              }else{
                throw {status:false, mensagem:'Credenciais erradas'}
              }
            }
          }else {
            throw {status:false, mensagem:'Credenciais não encontradas'}
          }
        } catch (err) {
          console.log(err);
          next(err);
        }
      },
}