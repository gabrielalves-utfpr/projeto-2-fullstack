const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/db")

const UserModel = require('../models/user')
const NewsModel = require('../models/news')

const { sucess, fail } = require("../helpers/resposta")

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })
    try {
    /*
    ? Tabela "User":
*   id	username	senha
    1	Gabriel	    gabriel
    2	Maria	    jK#7*2v!
    3	Pedro	    X6@fR4tZ
    4	Ana 	    bQ%3&8wK
    5	Carlos	    L2!sF5pA
    */
    await UserModel.save({username: 'Gabriel', password: 'gabriel'})
    await UserModel.save({username: 'Maria', password: 'jK#7*2v!'})
    await UserModel.save({username: 'Pedro', password: 'X6@fR4tZ'})
    await UserModel.save({username: 'Ana', password: 'bQ%3&8wK'})
    await UserModel.save({username: 'Carlos', password: 'L2!sF5pA'})
    //moon
    await NewsModel.save({title: 'Super Blue Moon Lunar Eclipse', image: 'https://images-assets.nasa.gov/video/NHQ_2018_0131_Super Blue Moon Lunar Eclipse/NHQ_2018_0131_Super Blue Moon Lunar Eclipse~thumb.jpg'})
    await NewsModel.save({title: 'Nearside of the Moon', image: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg'})
    await NewsModel.save({title: 'International Observe the Moon Night - Sept. 26 2020', image: 'https://images-assets.nasa.gov/video/NHQ_2020_0914_Observe the moon promo/NHQ_2020_0914_Observe the moon promo~thumb.jpg'})
    await NewsModel.save({title: 'Color of the Moon', image: 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~thumb.jpg'})
    await NewsModel.save({title: 'That No Moon...', image: 'https://images-assets.nasa.gov/image/PIA14208/PIA14208~thumb.jpg'})
    //earth
    await NewsModel.save({title: 'Earth from Orbit 2013', image: 'https://images-assets.nasa.gov/video/GSFC_20140421_EarthOrbit_m11525/GSFC_20140421_EarthOrbit_m11525~thumb.jpg'})
    await NewsModel.save({title: 'NASA Science Live: Earth Day at Home [Episode 14]', image: 'https://images-assets.nasa.gov/video/NHQ_2020_0423_NASA Science Live - Earth Day/NHQ_2020_0423_NASA Science Live - Earth Day~thumb.jpg'})
    await NewsModel.save({title: 'The Earth & Moon', image: 'https://images-assets.nasa.gov/image/PIA00342/PIA00342~thumb.jpg'})
    await NewsModel.save({title: 'Flight Day 19: Looking Toward Earth', image: 'https://images-assets.nasa.gov/video/FD 19 Earth/FD 19 Earth~thumb.jpg'})
    await NewsModel.save({title: "Meet NASA's 2020 Earth Expeditions", image: 'https://images-assets.nasa.gov/video/AFRC_2019_0107_Meet NASAs 2020 Earth Expeditions/AFRC_2019_0107_Meet NASAs 2020 Earth Expeditions~thumb.jpg'})
    
    //await NewsModel.save({title: '', image: ''})

} catch (error) {
    return res.json(fail('Falha ao Instalar Banco de Dados' + error.name))
}
    res.json(sucess('Banco Instalado com Sucesso'))
})

module.exports = router