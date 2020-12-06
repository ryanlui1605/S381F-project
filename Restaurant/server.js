const express = require('express');
const url = require('url');
const app = express();

// handler for having page

// Login Page
// Read (user collection)
app.get('/', (req, res) => {
    res.render('index');
});

// Page to handle user login
app.post('/processlogin', (req, res) => {
    // code here
    res.redirect('/read');
})


// Page to create user
// Create
// Create user accounts
//      - Each user account has a userid and password. 
app.get('/reg', (req, res) => {
    res.send('create user page');
});

// Page to handle user reg
app.post('/processlogin', (req, res) => {
    // code here
    res.redirect('/read');
})

// page to show 
// user name
// number of document
// button redirect to create new document
// list of restaurant name with link
// Read
app.post('/read', (req, res) => {
    res.send('main page');
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
app.post('/change', (req,res)=>{
    // show display view
})

// page to show remove status (Delete was successful)
// button redirect to home
// Remove
app.get('/remove', (req, res) => {
    res.send('Delete was successful');
});

// end of handler for having page

// handler for RESTful services
// not sure is it correct

app.get(/api\/restaurant\/name\/.*/,(req,res)=>{
    const parseUrl = url.parse(req.url,true);

    //get restaurant name
    const name = parseUrl.pathname.replace('/api/restaurant/name/','');

    res.send(name);
});

app.get(/api\/restaurant\/borough\/.*/,(req,res)=>{
    const parseUrl = url.parse(req.url,true);
    
    //get restaurant borough
    const borough = parseUrl.pathname.replace('/api/restaurant/borough/','');

    res.send(borough);
})

app.get(/api\/restaurant\/cuisine\/.*/,(req,res)=>{
    const parseUrl = url.parse(req.url,true);

    //get restaurant cuisine
    const cuisine = parseUrl.pathname.replace('/api/restaurant/cuisine/','');

    res.send(cuisine);
})

// end of handler for RESTful services




const server = app.listen(process.env.PORT || 8099);