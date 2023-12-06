const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const SearchModel = sequelize.define('Search', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = {
    save: async function (obj) {
        return await SearchModel.create({
            userId: obj.userId,
            term: obj.term,
        })
    },
    list: async function () {
        const search = await SearchModel.findAll()
        return search
    },
    listByUser: async function (userId) {
        const search = await SearchModel.findAll({
            where: {
                userId: userId
            }
        })
        return search
    },
    model: SearchModel
};