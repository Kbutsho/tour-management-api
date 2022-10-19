const express = require('express');
const {
    getAllTour,
    createTour,
    getTourById,
    updateTour,
    trendingTour,
    cheapestTour
} = require('../controllers/tour.controller');
const tourRouter = express.Router();

tourRouter.route('/')
    .get(getAllTour)
    .post(createTour)
tourRouter.route('/trending')
    .get(trendingTour)
    tourRouter.route('/cheapest')
    .get(cheapestTour)
tourRouter.route('/:id')
    .patch(updateTour)
    .get(getTourById)
    
module.exports = tourRouter;