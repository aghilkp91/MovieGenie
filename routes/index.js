/**
 * Created by Aghil
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const post = require("../controllers/Post");

const $login_controller = require('../controllers/login_controller');
const $checkAuth = require('../middelware/auth');
const $signup_controller = require('../controllers/signup_controller');
const $movie_controller = require('../controllers/movie_controller');


const express = require("express");
const router = express.Router();
// Create New Post
// router.post("/api/posts/create", post.create);
// // // Retrieve all posts
// router.get("/api/posts/all", post.getAllPosts);
// // Retrieve all Published posts
// router.get("/api/posts/published", post.getAllPublishedPosts);
// // Retrieve all Published posts by Publisher Name
// router.get("/api/posts/publisher", post.getAllPostsByPublisherName);
// // Retrieve all posts by title
// router.get("/api/posts", post.getPostByTitle);
// // Retrieve post by ID
// router.get("/api/posts/:id", post.getPostByID);
// // // Update post by ID
// router.put("/api/post/update/:id", post.updatePostByID);
// // // Delete post by ID
// router.delete("/api/post/delete/:id", post.deletePostByID);
// // Delete all posts
// router.delete("/api/posts/deleteAll", post.deleteAllPosts);

//create
router.post('/login', $login_controller.postLogin);

//Handling Post Request
router.post('/signup', $signup_controller.postUser);
//Handling Get Request
router.get('/signup', $checkAuth, $signup_controller.getAllUsers);
//Handling Get Request To Get The Unique
router.get('/signup/id/:id', $checkAuth, $signup_controller.getUniqueUser);
//Handling Delete Request
router.delete('/signup/id/:id', $checkAuth, $signup_controller.deleteUserById);
//Upating user details
router.put('/signup/id/:id', $checkAuth, $signup_controller.updateUserById);

//Updating movie names, actors, genre, last_movie_recommendation
router.put('/movies', $checkAuth, $movie_controller.updateMovieByUserId);
// //Handling Get request for movie names
// router.get('/movies/movieName/id/:id', $checkAuth, $movie_controller.getMovieNameByUserId);
// //Handling Get request for Genre names
// router.get('/movies/genre/id/:id', $checkAuth, $movie_controller.getGenreByUserId);
// //Handling Get request for actor names
// router.get('/movies/actor/id/:id', $checkAuth, $movie_controller.getActorByUserId);
// //Handling Get request for last_movie_recommendation
// router.get('/movies/recommendation/id/:id', $checkAuth, $movie_controller.getRecommendationByUserId);

module.exports = router;
