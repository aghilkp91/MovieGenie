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
        }
    });

    // User.beforeCreate((user, options) => {
    //
    //     return bcrypt.hash(user.password, 10)
    //         .then(hash => {
    //             user.password = hash;
    //         })
    //         .catch(err => {
    //             throw new Error();
    //         });
    // })

    // User.prototype.comparePassword = function(pw, callback) {
    //     let err, pass
    //     if(!this.password) return false;
    //
    //     bcrypt.compare(pw, this.password, callback);
    // }

    // User.prototype.verifyCredentials = function(loginData, callback) {
    // if(!loginData.username || !loginData.password) return callback('Please provide email and password');
    // }

    return User;
}