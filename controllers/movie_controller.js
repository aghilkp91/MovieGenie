/**
 * Created by Aghil
 * Project : MovieGenie
 * Filename : signup_controller.js
 * Date: 07/05/2020
 * Time: 22:08
 **/

// const $db = require('../config/db.inc');
const $db = require("../models");
const userObj = $db.users;


//Updating movie names, actors, genre, last_movie_recommendation
exports.updateMovieByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    //const $userId = req.params.id;
    const user_id = userObj
    userObj.findAll({
        where: {userGenieName: $userId}
    }).catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(404).send({
            Error: {
                message: err.message
            }
        });
    }).then(result => {
        const resu = result[0].dataValues;
        if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).send({
                Error: {
                    message: `User not found in the system`
                }
            });
        } else {
            const updateObj = {}
            let movies = resu.movieNames ? resu.movieNames.split("||") : [];
            let actors = resu.actorNames ? resu.actorNames.split("||") : [];
            let genres = resu.genreNames ? resu.genreNames.split("||") : [];
            if (req.body.movieNames && req.body.movieNames !== "") {
                movies.push(req.body.movieNames);
                updateObj.movieNames = movies.join("||");
            }
            if (req.body.actorNames && req.body.actorNames !== "") {
                actors.push(req.body.actorNames);
                updateObj.actorNames = actors.join("||");
            }
            if (req.body.genreNames && req.body.genreNames !== "") {
                genres.push(req.body.genreNames);
                updateObj.genreNames = genres.join("||");
            }
            console.log(`Movies : ${movies}`)
            userObj.update(updateObj, {
                where: {userGenieName: $userId}
            }).catch(err => {
                console.log(`Error: ${err.message}`);
                res.status(404).send({
                    Error: {
                        message: err.message
                    }
                });
            }).then(resul => {
                console.log(`Updated movie details for user: ${$userId}`);
                res.status(200).send({
                    message: `Updated the movie fields successfully`
                });
            });
        }
    })
}

//Get movie names of the user
exports.getMovieNameByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    const user_id = userObj
    userObj.findAll({
        where: {userGenieName: $userId}
    }).catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(404).send({
            Error: {
                message: err.message
            }
        });
    }).then(result => {
        const resu = result[0].dataValues;
        if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).send({
                Error: {
                    message: `User not found in the system`
                }
            });
        } else {
            let movies = resu.movieNames ? resu.movieNames.split("||") : [];
            console.log(`Movie Names of user: ${$userId} retrieved successfully`);
            res.status(200).send({
                message: `Movie  Names fetched successfully`,
                success: movies
            });
        }
    });
}

//Get Genre names of the user
exports.getGenreByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    const user_id = userObj
    userObj.findAll({
        where: {userGenieName: $userId}
    }).catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(404).send({
            Error: {
                message: err.message
            }
        });
    }).then(result => {
        const resu = result[0].dataValues;
        if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).send({
                Error: {
                    message: `User not found in the system`
                }
            });
        } else {
            let genre = resu.genreNames ? resu.genreNames.split("||") : [];
            console.log(`Genre Names of user: ${$userId} retrieved successfully`);
            res.status(200).send({
                message: `Genre Names fetched successfully`,
                success: genre
            });
        }
    });
}

//Get actorNames names of the user
exports.getActorByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    const user_id = userObj
    userObj.findAll({
        where: {userGenieName: $userId}
    }).catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(404).send({
            Error: {
                message: err.message
            }
        });
    }).then(result => {
        const resu = result[0].dataValues;
        if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).send({
                Error: {
                    message: `User not found in the system`
                }
            });
        } else {
            let actors = resu.actorNames ? resu.actorNames.split("||") : [];
            console.log(`Actor Names of user: ${$userId} retrieved successfully`);
            res.status(200).send({
                message: `Actor Names fetched successfully`,
                success: actors
            });
        }
    });
}


//Get Last recommended movie of the user
exports.getRecommendationByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    const user_id = userObj
    userObj.findAll({
        where: {userGenieName: $userId}
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
            console.log(`Last recommended movie name of user: ${$userId} retrieved successfully`);
            res.status(200).send({
                message: `Last recommended movie name fetched successfully`,
                success: result[0].dataValues.lastRecommendedMovie
            });
        }
    });
}


//Updating movie names, actors, genre, last_movie_recommendation
exports.putRecommendationByUserId = (req, res, next) => {

    const $userId = req.userData.User_Name;
    //const $userId = req.params.id;
    if (req.body.lastRecommendedMovie === undefined || req.body.lastRecommendedMovie === '') {
        console.log(`Error: data not found`);
        res.status(404).send({
            Error: {
                message: `User not found in the system`
            }
        });
    } else {
        const updateObj = {
            lastRecommendedMovie: req.body.lastRecommendedMovie
        }
        userObj.update(updateObj, {
            where: {userGenieName: $userId}
        }).catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(404).send({
                Error: {
                    message: err.message
                }
            });
        }).then(resul => {
            console.log(`Updated last recommended movie for user: ${$userId}`);
            res.status(200).send({
                message: `Updated the last recommended movie field successfully`
            });
        });
    }
}