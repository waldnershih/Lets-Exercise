const express = require('express');

const usersRouter = require('./users.js');
const exercisesRouter = require('./exercises.js');
const reviewsRouter = require('./reviews.js');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/exercises', exercisesRouter);
api.use('/exercises/:exerciseId/reviews', reviewsRouter);

module.exports = api;
