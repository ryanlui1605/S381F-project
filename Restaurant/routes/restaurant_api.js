const express = require('express');

const restaurantController = require('../controllers/restaurant');

const router = express.Router();


// "?" for optional params
router.get('/api/restaurant/name/:name?', restaurantController.getRestaurantByName);

router.get('/api/restaurant/borough/:borough?', restaurantController.getRestaurantByBorough);

router.get('/api/restaurant/cuisine/:cuisine?', restaurantController.getRestaurantByCuisine);

module.exports = router;