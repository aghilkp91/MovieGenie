/**
 * Created by Aghil
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const $login_controller = require('../controllers/login_controller');
const $checkAuth = require('../middelware/auth');
const $signup_controller = require('../controllers/signup_controller');
const $movie_controller = require('../controllers/movie_controller');


const express = require("express");
const router = express.Router();

//create
router.post('/login', $login_controller.postLogin);

//Handling Post Request
router.post('/signup', $signup_controller.postUser);
//Handling Get Request
router.get('/users', $checkAuth, $signup_controller.getAllUsers);
//Handling Get Request To Get The Unique
router.get('/users/id/:id', $checkAuth, $signup_controller.getUniqueUser);
//Handling Delete Request
router.delete('/users/id/:id', $checkAuth, $signup_controller.deleteUserById);
//Upating user details
router.put('/users/id/:id', $checkAuth, $signup_controller.updateUserById);
//Updating chatbotType
router.put('/chatbotType/id/:id', $checkAuth, $signup_controller.putChatbotType);
//Handling Get chatbotType
router.get('/chatbotType/id/:id',$checkAuth, $signup_controller.getChatbotType);


//Updating movie names, actors, genre, last_movie_recommendation
router.put('/movies', $checkAuth, $movie_controller.updateMovieByUserId);
// //Handling Get request for movie names
router.get('/movies/movieName', $checkAuth, $movie_controller.getMovieNameByUserId);
// //Handling Get request for Genre names
router.get('/movies/genre', $checkAuth, $movie_controller.getGenreByUserId);
// //Handling Get request for actor names
router.get('/movies/actors', $checkAuth, $movie_controller.getActorByUserId);
// //Handling Get request for last_movie_recommendation
router.get('/movies/recommendation', $checkAuth, $movie_controller.getRecommendationByUserId);
// Update last movie recommendation
router.put('/movies/recommendation', $checkAuth, $movie_controller.putRecommendationByUserId);

module.exports = router;
