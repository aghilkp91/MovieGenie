/**
 * Created by Christos Aghil
 * Project : MovieGenie
 * Filename : movie.js
 * Date: 07/05/2020
 **/
module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define('movie', {
    movieId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER
    },
    movieNames: {
      type: Sequelize.STRING
    },
    genreNames: {
      type: Sequelize.STRING
    },
    actorNames: {
      type: Sequelize.STRING
    },
    lastRecommendedMovie: {
      type: Sequelize.STRING
    }
  });

  return Movie;
}