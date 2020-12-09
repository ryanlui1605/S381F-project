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
        this.checkExist( db, {"username": this.username }, (count) => {
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

    checkExist(db, criteria, callback) {
        console.log(criteria);
        db.collection('users').countDocuments(criteria, (err, count) => {
            assert.equal(null, err);
            callback(count);
        });
    }


    // Read
    // user(login) collections
    // handle result in callback
    login(callback) {
        const db = getDb();
        this.checkExist(db, this, (count) => {
            // count = 0, !count = true, !!count = false = login fail
            // count !=0  !count = false, !!count = true = login success
            // Here need to pass a boolean to callback
            callback(!!count);
        })
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