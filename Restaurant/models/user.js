const getDb = require("../utils/db").getDb;
const assert = require('assert');

class User {
    constructor(username, password) {
        // username should be unique
        // so we may not need to get the id from database
        this.username = username;
        this.password = password;
    }


    // function for CRUD

    // Create
    // user(reg) collections
    // handle result in callback
    
    createNewUser(callback) {
        const db = getDb();
        //check username exist
        db.collection('users').countDocuments({ "username": this.username }, (err, count) => {
            assert.equal(null, err);
            if (count > 0) {
                //if username exist
                callback(false);
            } else {
                //if username not exist
                db.collection('users').insertOne(this, (err, results) => {
                    assert.equal(null, err);
                    callback(true);
                })
            }
        });
    }


    // Read
    // user(login) collections
    // handle result in callback
    login(callback) {

    }





    // Update
    // only requst on restaurant
    // handle result in callback
    // no use case to implement
    // const update = (criteria, callback) => {
    // }

    // Delete
    // only requst on restaurant
    // handle result in callback
    // no use case to implement
    // const remove = (criteria, callback) => {
    // }

    // end of function for CRUD
}

module.exports = User;