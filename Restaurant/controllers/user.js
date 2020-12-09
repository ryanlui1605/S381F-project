const User = require('../models/user');
const formidable = require('formidable');

// Login/Home Page
// Read (user collection)
exports.getHomePage = (req, res) => {
    res.render('index');
};

// handle user login
// success = redirect to homePage
// fail = redirect to readPage
exports.processLogin = (req, res) => {
    // code here
    res.redirect('/read');
};


// Page to create user
// Create
// Create user accounts
//      - Each user account has a userid and password. 
exports.getRegPage = (req, res) => {
    res.render('reg');
};

// handle user reg
exports.processReg = (req, res) => {
    // code here
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        //check password==confirm
        if (fields.password != fields.confirm) {
            res.redirect('/reg');
        }
        const user = new User(fields.username, fields.password);
        user.createNewUser((status) => {
            if (status) {
                res.end('success');
            } else {
                res.end('fail');
            }
        });
    })
};