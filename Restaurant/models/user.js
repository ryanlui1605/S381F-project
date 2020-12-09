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
        this.checkDuplicateUserName(db, (count) => {
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

    checkDuplicateUserName(db, callback) {
        db.collection('users').countDocuments({ "username": this.username }, (err, count) => {
            assert.equal(null, err);
            callback(count);
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