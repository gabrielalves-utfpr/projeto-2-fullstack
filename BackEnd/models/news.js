/*
    ? Tabela "News":
*   id: int pkey
*   nome: string
*   image: string (url)
*/

const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/db")

const NewsModel = sequelize.define('News', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

module.exports = {
    list: async function () {
        const news = await NewsModel.findAll()
        return news
    },
    listByPage: async function (limit, pag) {
        const news = await NewsModel.findAndCountAll({
            offset: limit * (pag - 1),
            limit: limit
        })
        return news // {count | rows}
    },

    save: async function (title, image) {
        const news = await NewsModel.create({
            title: title,
            image: image
        })

        return news
    },

    search: async function (term){
        return await NewsModel.findAll({
            where: {
                title: {
                    [Op.like]: '%' + term + '%'
                }
            }
        })
    },

    update: async function (title, newtitle) {
        return await NewsModel.update(
            { title: newtitle },
            { where: { title: title } }
        )
    },

    updateById: async function (id, newtitle) {
        return await NewsModel.update(
            { title: newtitle },
            { where: { id: id } }
        )
    },

    delete: async function (title) {
        return await NewsModel.destroy({ where: { title: title } })
    },

    deleteById: async function (id) {
        return await NewsModel.destroy({ where: { id: id } })
    },

    getById: async function (id) {
        return await NewsModel.findByPk(id)
    },

    getBytitle: async function (title) {
        return await NewsModel.findOne({
            where: {
                title: title
            }
        })
    },
    model: NewsModel
}