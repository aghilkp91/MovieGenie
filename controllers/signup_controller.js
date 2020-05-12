/**
 * Created by Aghil
 * Project : MovieGenie
 * Filename : signup_controller.js
 * Date: 07/05/2020
 * Time: 22:08
 **/

// const $db = require('../config/db.inc');
const $db = require("../models");
const usersObj = $db.users;
const $bcrypt = require('bcrypt');


//Posting Data To The DataBase
exports.postUser = (req, res, next) => {
    const paramID = req.body.user_id;
    usersObj.findAll({
        where: {userGenieName: paramID}
    })
        .then(data => {
            if (data.length >= 1) {
                console.log(`Error: duplicate user id`);
                res.status(404).send({
                    Error: {
                        message: `duplicate user id`
                    }
                });
            } else {
                if (paramID === "" || req.body.password === "") {
                    console.log(`Error: empty fields found`);
                    res.status(404).send({
                        Error: {
                            message: `empty fields found`
                        }
                    });
                } else {
                    $bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.log(`Error: ${err.message}`);
                            res.status(409).send({
                                Error: {
                                    message: err.message
                                }
                            });
                        } else {
                            // const $sql = `INSERT INTO users SET ?`;
                            const $data = {userGenieName: paramID, password: hash, noOfLogins: 0};
                            if (req.body.age) {
                                $data.age = req.body.age
                            }
                            if (req.body.gender) {
                                $data.gender = req.body.gender
                            }
                            if (req.body.country) {
                                $data.country = req.body.country
                            }
                            usersObj.create($data).then(data => {
                                console.log(`New signup detected for ${data.userGenieName}`);
                                res.status(200).send({
                                    success: {
                                        message: `Sign in successful. Please log in to access MovieGenie`
                                    }
                                });
                            }).catch(err => {
                                console.log(`Error: ${err.message}`);
                                res.status(404).send({
                                    Error: {
                                        message: err.message
                                    }
                                });
                            });
                        }
                    });
                }
            }
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data."
            });
        });
};


//Getting All The Data Form The DataBase
exports.getAllUsers = (req, res, next) => {
    usersObj.findAll().catch(err => {
        console.log(`Error: ${err.message}`);
        res.status(404).send({
            Error: {
                message: err.message
            }
        });
    }).then(result => {
        if (result.length < 1) {
            console.log(`Error: data not found`);
            res.status(404).json({
                Error: {
                    message: `users not found`
                }
            });
        } else {
            const $resp = result.map(user => {
                return {
                    UserName: user.userGenieName,
                    Age: user.age,
                    Gender: user.gender,
                    Country: user.country,
                    NoOfLogins: user.noOfLogins
                }
            });
            console.log(`Successfully returned all results`);
            res.status(200).send({
                message: `Successfully retrieved all user id's`,
                success: $resp
            });
        }
    });
}


//Getting Unique Data From The DataBase
exports.getUniqueUser = (req, res, next) => {
    const $userId = req.params.id;

    usersObj.findAll({
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
            console.log(`Error: user not found`);
            res.status(404).send({
                Error: {
                    message: `user not found`
                }
            });
        } else {
            const user = result[0].dataValues;
            const $resp = {
                UserName: user.userGenieName,
                Age: user.age,
                Gender: user.gender,
                Country: user.country,
                NoOfLogins: user.noOfLogins
            }
            console.log(`Successfully returned the details of ${$resp.UserName}`);
            res.status(200).send({
                message: `User retrieved successfully`,
                success: $resp
            });

        }
    });
};


//Delete Data From The DataBases
exports.deleteUserById = (req, res, next) => {

    const $userId = req.params.id;
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
        if (result.length < 1) {
            console.log(`Error: data not found for deletion`);
            res.status(404).json({
                Error: {
                    message: `data not existing in system for deleting`
                }
            });
        } else {
            usersObj.destroy({
                where: {userGenieName: $userId}
            }).catch(err => {
                console.log(`Error: ${err.message}`);
                res.status(404).json({
                    Error: {
                        message: err.message
                    }
                });
            }).then(result => {
                console.log(`Deleted: ${result}`);
                res.status(200).json({
                    message: `User ${$userId} successfully deleted`,
                });
            })
        }
    });
};


// Updating Data In The DataBase
exports.updateUserById = (req, res, next) => {

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
                            userGenieName: $userId,
                            password: hash,
                            age: req.body.age === result.age ? result.age : req.body.age,
                            gender: req.body.gender === result.gender ? result.gender : req.body.gender,
                            country: req.body.country === result.country ? req.body.country : req.body.country
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
};