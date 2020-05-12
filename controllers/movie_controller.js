/**
 * Created by Aghil
 * Project : MovieGenie
 * Filename : signup_controller.js
 * Date: 07/05/2020
 * Time: 22:08
 **/

// const $db = require('../config/db.inc');
const $db = require("../models");
const movieObj = $db.movies;


//Updating movie names, actors, genre, last_movie_recommendation
exports.updateMovieByUserId = (req, res, next) => {


    const $userId = req.params.id;
    if (req.body.user_id === "" || req.body.password === "") {
        console.log(`Error: empty fields found`);
        res.status(404).send({
            Error: {
                message: `UserId or password is empty`
            }
        });
    } else {
        usersObj.findAll({
            where: {user_genie_name: $userId}
        }).catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(404).send({
                Error: {
                    message: err.message
                }
            });
        }).then(result => {
            if (result.length < 1) {
                console.log(`Error: data not found`);
                res.status(404).send({
                    Error: {
                        message: `User not found in the system`
                    }
                });
            } else {
                $bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(`Error: ${err.message}`);
                        res.status(409).json({
                            Error: {
                                message: err.message
                            }
                        });
                    } else {

                        const updateObj = {
                            user_genie_name: $userId,
                            password: hash,
                            age: req.body.age === result.age ? result.age : req.body.age,
                            gender: req.body.gender === result.gender ? result.gender : req.body.gender,
                            country: req.body.country === result.country ? req.body.country : req.body.country
                        }
                        usersObj.update(updateObj, {
                            where: {user_genie_name: $userId}
                        }).catch(err => {
                            console.log(`Error: ${err.message}`);
                            res.status(404).json({
                                Error: {
                                    message: err.message
                                }
                            });
                        }).then(resul => {
                            console.log(`Updated details for user: ${$userId}`);
                            res.status(200).json({
                                message: `Updated the fields successfully`
                            });
                        });
                    }
                })
            }
        });
    }
}