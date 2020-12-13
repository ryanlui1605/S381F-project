const { json, response } = require('express');
const http = require('http');

const restaurant = require('../models/restaurant');

// API
exports.getRestaurantByName = (req, res) => {
    const restaurantName = req.params.name;
    const doc = restaurantName ? { name: restaurantName } : restaurantName;
    getResult(doc, res);
}

exports.getRestaurantByBorough = (req, res) => {
    const restaurantBorough = req.params.borough;
    const doc = restaurantBorough ? { borough: restaurantBorough } : restaurantBorough;
    getResult(doc, res);
};

exports.getRestaurantByCuisine = (req, res) => {
    const restaurantCuisine = req.params.cuisine;
    const doc = restaurantCuisine ? { cuisine: restaurantCuisine } : restaurantCuisine;
    getResult(doc, res);
};

const getResult = (doc, res) => {
    restaurant.getAllRestaurant(doc, null, (docs) => {
        if (docs.length == 0) {
            res.status(500).json({});
        } else {
            res.status(200).json(docs);
        }
    });
}
// End of API

exports.getReadPage = (req, res) => {
    restaurant.getAllRestaurant(undefined, {name:1}, (docs) => {
        const result = {
            userid: req.session.userid,
            numberOfRestaurant: docs.length,
            restaurants: docs
        };
        res.render(
            'read',
            result
        );
    });
};


exports.getSearchPage = (req, res) => {
    res.send('search page');
};

// page to create new restaurant document
// redirect to create page by post method after click create
// Create
// Create new restaurant documents
//     • Restaurant documents may contain the following attributes:
//      i. restaurant_id
//      ii. name
//      iii. borough
//      iv. cuisine
//      v. photo
//      vi. photo mimetype
//      vii. address
//          1. street
//          2. building
//          3. zipcode
//          4. coord
//      viii. grades
//          1. user
//          2. score
//      ix. owner
// • name and owner are mandatory; other attributes are optional
exports.getNewPage = (req, res) => {
    res.send('create document page');
};

// page to show created document
// can redirect to rate, edit, remove, main page
// Read
// Display restaurant documents
//      • Show photo if it's available
//      • Show a link to Leaflet if coord is available
exports.processCreate = (req, res) => {
    res.send('created document page');
};

// page to show selected restaurant
// can redirect to rate, edit, remove, main page
//Display restaurant documents
//      • Show photo if it's available
//      • Show a link to Leaflet if coord is available
exports.getDisplayPage = (req, res) => {
    //show display view
};

// page to rate restaurant
// get method to get object id
// after rate redirect to display page (like /create page)
// Read+Update
// Rate restaurant. A restaurant can only be rated once by the same user.
//      • score > 0 and score <= 10
exports.getRatePage = (req, res) => {
    res.send('rating page');
};

// page to handle rating
exports.processRate = (req, res) => {
    //show display view
};

// page to edit restaurant document
// fill in with existing information
// Read+Update
// Update restaurant documents
//      • A document can only be updated by its owner (i.e. the user who created
//        the document)
exports.getChangePage = (req, res) => {
    res.send('update page');
};

// page to handle editing restaurant document
exports.processChange = (req, res) => {
    // show display view
};

// handle delete restaurant first
// page to show remove status (Delete was successful or not)
// button redirect to home
// Remove
exports.getRemovePage = (req, res) => {
    res.send('Delete was successful');
};