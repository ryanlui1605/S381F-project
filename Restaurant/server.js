const express = require('express');
const url = require('url');
const app = express();
const session = require('cookie-session');

const mongodbConnect = require('./utils/db').mongodbConnect;
const userRoutes = require('./routes/user');
const key1 = "ui3bqoithj2q4piofmnlskdanmgvm#Q$ty'p1o03jgp'dfbvmdZ:Fmb";
const key2 = "ifhaosihguiqwgrh98vhnoi3n4tgh309123-.1-3123-o1-.412-312";

// handler for RESTful services
// not sure is it correct

app.get(/api\/restaurant\/name\/.*/, (req, res) => {
    const parseUrl = url.parse(req.url, true);

    //get restaurant name
    const name = parseUrl.pathname.replace('/api/restaurant/name/', '');

    res.send(name);
});

app.get(/api\/restaurant\/borough\/.*/, (req, res) => {
    const parseUrl = url.parse(req.url, true);

    //get restaurant borough
    const borough = parseUrl.pathname.replace('/api/restaurant/borough/', '');

    res.send(borough);
})

app.get(/api\/restaurant\/cuisine\/.*/, (req, res) => {
    const parseUrl = url.parse(req.url, true);

    //get restaurant cuisine
    const cuisine = parseUrl.pathname.replace('/api/restaurant/cuisine/', '');

    res.send(cuisine);
})

// end of handler for RESTful services

// set default engine to view ejs
app.set('view engine', 'ejs');
app.use(session({
    name: 'user',
    keys: [key1, key2],
    maxAge: 24 * 60 * 60 * 1000 //24h * 60m * 60s * 1000ms = 24hours
}))

// routes for login and register
app.use(userRoutes);

//if not requiring homepage or register page, check cookie
app.use(/\/.+/, (req,res,next)=>{
    console.log(req.session.username);
    if(!req.session.username){  
        //username is empty
        res.redirect('/'); 
        next();
    }else{
        //username is not empty
        next();
    }
})
// page to show 
// user name
// number of document
// button redirect to create new document
// list of restaurant name with link
// testing object for read
class testing {
    constructor() {
        this.username = 1;
        this.restaurants =
            [
                {
                    _id: 123,
                    name: "fuck"
                },
                {
                    _id: 124,
                    name: "fuck2"
                }
            ]
        this.numberOfRestaurant = this.restaurants.length;
    }
}
const testing1 = new testing();  // end of creating testing object
// Read
app.get('/read', (req, res) => {
    res.render(
        'read',
        testing1
    );
});

// page to implement search function
// Search
//      • by name, borough, cuisine or borough.
app.get('/search', (req, res) => {
    res.send('search page');
});

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
app.get('/new', (req, res) => {
    res.send('create document page');
});

// page to show created document
// can redirect to rate, edit, remove, main page
// Read
// Display restaurant documents
//      • Show photo if it's available
//      • Show a link to Leaflet if coord is available
app.post('/create', (req, res) => {
    res.send('created document page');
});

// page to show selected restaurant
// can redirect to rate, edit, remove, main page
//Display restaurant documents
//      • Show photo if it's available
//      • Show a link to Leaflet if coord is available
app.get('/display', (req, res) => {
    //show display view
});

// page to rate restaurant
// get method to get object id
// after rate redirect to display page (like /create page)
// Read+Update
// Rate restaurant. A restaurant can only be rated once by the same user.
//      • score > 0 and score <= 10
app.get('/rate', (req, res) => {
    res.send('rating page');
});

// page to handle rating
app.post('/rate', (req, res) => {
    //show display view
});

// page to edit restaurant document
// fill in with existing information
// Read+Update
// Update restaurant documents
//      • A document can only be updated by its owner (i.e. the user who created
//        the document)
app.get('/change', (req, res) => {
    res.send('update page');
});

// page to handle editing restaurant document
app.post('/change', (req, res) => {
    // show display view
})

// page to show remove status (Delete was successful)
// button redirect to home
// Remove
app.get('/remove', (req, res) => {
    res.send('Delete was successful');
});

// end of handler for having webpage





mongodbConnect(() => {
    app.listen(process.env.PORT || 8099);
});