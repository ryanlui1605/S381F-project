const express = require('express');
const url = require('url');
const app = express();
const session = require('cookie-session');

const mongodbConnect = require('./utils/db').mongodbConnect;
const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurnt');
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
    if(!req.session.username){  
        //username is empty
        req.session=null;
        res.redirect('/');
    }else{
        //username is not empty
        next();
    }
})

app.use(restaurantRoutes);





mongodbConnect(() => {
    app.listen(process.env.PORT || 8099);
});