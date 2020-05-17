/**
 * Created by Aghil
 * Project : MovieGenie
 * Filename : login_controller.js
 * Date: 07/05/2020
 * Time: 22:08
 **/

//const $db = require('../config/db.inc');
const $db = require("../models");
const $bcrypt = require('bcrypt');
const $jwt = require('jsonwebtoken');
const usersObj = $db.users;

//To Have LoggedIn
exports.postLogin = (req, res, next) => {
    const $userId = req.body.user_id;

    if ($userId === "" || req.body.password === "") {
        console.log(`Error: empty fields found`);
        res.status(404).json({
            Error: {
                message: `empty fields found`
            }
        });
    } else {
        // $db.query($sql, (err, result) => {
        usersObj.findAll({
            where: {userGenieName: $userId}
        }).catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(404).json({
                Error: {
                    message: err.message
                }
            });
        }).then(result => {
            const user = result[0].dataValues;
            if (result.length < 1) {
                console.log(`Error: user id not found`);
                res.status(404).json({
                    Error: {
                        message: `user id not found`
                    }
                });
            } else {
                // $bcrypt.compare(req.body.password, user.password, (err, resp) => {
                $bcrypt.compare(req.body.password, user.password)
                    .catch((err) => {
                        console.log(`Error: ${err.message}`);
                        res.status(409).json({
                            Error: {
                                message: err.message
                            }
                        });
                    }).then((resp) => {
                    if (resp) {
                        const $token = $jwt.sign({
                                Id: user.userId,
                                User_Name: user.userGenieName,
                                Password: user.password
                            },
                            "MovieGenie", {
                                expiresIn: '1h'
                            });
                        //Update the login attempts count
                        const updateObj = {
                            noOfLogins: user.noOfLogins + 1,
                        }
                        usersObj.update(updateObj, {
                            where: {userGenieName: $userId}
                        }).catch(err => {
                            console.log(`Error: ${err.message}`);
                            res.status(404).json({
                                Error: {
                                    message: err.message
                                }
                            });
                        }).then(resul => {
                            console.log(`Login successful for user ${$userId} with no of logins updated to ${updateObj.noOfLogins}`);
                            res.status(200).json({
                                message: `login successful!`,
                                AuthToken: $token
                            });
                        });
                    } else {
                        console.log(`Error: invalid password`);
                        res.status(409).json({
                            Error: {
                                message: `invalid password`
                            }
                        })
                    }
                });
            }
        });
    }
};
