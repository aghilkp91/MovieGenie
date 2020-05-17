/**
 * Created by Christos Aghil
 * Project : MovieGenie
 * Filename : user.js
 * Date: 07/05/2020
 **/

const bcrypt = require("bcrypt");


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userGenieName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        noOfLogins: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        chatbotType:{
            type: Sequelize.INTEGER
        },
        movieNames: {
            type: Sequelize.TEXT
        },
        genreNames: {
            type: Sequelize.TEXT
        },
        actorNames: {
            type: Sequelize.TEXT
        },
        lastRecommendedMovie: {
            type: Sequelize.STRING
        }
    });


    return User;
}