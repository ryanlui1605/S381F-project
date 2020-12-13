const User = require('../models/user');
const formidable = require('formidable');


// Login/Home Page
// Read (user collection)
exports.getHomePage = (req, res) => {
    if (req.session.username) {
        res.redirect('/read');
    } else {
        res.render('index');
    }
};

// handle user login
// success = redirect to homePage
// fail = redirect to readPage
exports.processLogin = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const username = fields.username;
        const password = fields.password;
        const user = new User(username, password);
        user.login((status) => {
            if (status) {
                req.session.username = username;
                console.log("processLogin" + req.session.username);
                res.redirect('/read');
            } else {
                res.render('loginfail');
            }
        })
    })
};

// Page to create user
// Create
// Create user accounts
//      - Each user account has a userid and password. 
exports.getRegPage = (req, res) => {
    if (req.session.username) {
        res.redirect('/read');
    } else {
        res.render('reg');
    }
};

// handle user reg
exports.processReg = (req, res) => {
    // code here
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const username = fields.username;
        const password = fields.password;
        const confirm = fields.confirm;
        //double check by server side
        if (password != confirm || // check password = confirm password
            password == '' || username == '') {   // check empty input
            res.redirect('/reg');   // if something get wrong, back to /reg
        }
        const user = new User(username, password);
        user.createNewUser((status) => {
            if (status) {
                req.session.username = username;
                res.redirect('/read');
            } else {
                res.render('regfail');
            }
        });
    })
};