const fs = require('fs');
const formidable = require('formidable');
const assert = require('assert');
const getDb = require("../utils/db").getDb;

exports.getAllRestaurant = (criteria={},filter={},callback)=>{
    const db = getDb();
    let cursor = db.collection('restaurants').find(criteria,filter);
    cursor.toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs); //array
    })
}

const restaurant = {
    //use after created document
    // constructor(restaurant_id,
    //     name, borough, cuisine, photo,
    //     photoMimetype, address,
    //     grades, owner) {
    //     // • Restaurant documents may contain the following attributes:
    //     // • name and owner are mandatory; other attributes are optional
    //     //      i. restaurant_id
    //     if (restaurant_id != null) {
    //         //only create attribute restaurant_id when parameter restaurant_id is something
    //         this.restaurant_id = restaurant_id;   //from mongodb
    //     }
    //     //      ii. name
    //     this.name = name;     //from user, String
    //     //      iii. borough
    //     if (borough != null) {
    //         this.borough = borough;   //option, String
    //     }
    //     //      iv. cuisine
    //     if (cuisine != null) {
    //         this.cuisine = cuisine;  //option, String
    //     }
    //     //      v. photo
    //     if (photo != null) {
    //         this.photo = photo;   //String('base64'), option
    //     }
    //     //      vi. photo mimetype
    //     if (photoMimetype != null) {
    //         this.photoMimetype = photoMimetype; //option, String
    //     }
    //     //      vii. address
    //     //          1. street
    //     //          2. building
    //     //          3. zipcode
    //     //          4. coord
    //     if (address != null) {
    //         this.address = address; //option, object
    //     }
    //     //      viii. grades
    //     //          1. user
    //     //          2. score
    //     if (grades != null) {
    //         this.grades = grades;   //option, array
    //     }
    //     //      ix. owner
    //     this.owner = owner; //equal to user, String
    // }
}

const grade = {
    // constructor(user, score) {
    //     this.user = user;
    //     this.score = score;
    // }
}

const address = {
    // constructor(street, building, zipcode, coord) {
    //     this.street = street;
    //     this.building = building;
    //     this.zipcode = zipcode;
    //     this.coord = coord;
    // }
}
const coord = {
    // constructor(lon, lat) {
    //     this.lon = lon;
    //     this.lat = lat;
    // }
}

// POST method to get data

// function for CRUD

// Create
// handle result in callback
const create = (req) => {
    //req.body to get object from post method
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (files.sampleFile && files.sampleFile.size > 0) {
            fs.readFile(files.sampleFile.path, (err, data) => {
                assert.equal(err, null);
                //      v. photo
                restaurant.photo = new Buffer.from(data).toString('base64');
                //      vi. photo mimetype
                restaurant.mimetype = files.sampleFile.type;

                let jsonObj = JSON.stringify(restaurant);
                console.log(jsonObj);
            })
            initRestaurant(fields);
        } else {
            initRestaurant(fields);
            let jsonObj = JSON.stringify(restaurant);
            console.log(jsonObj);
        }
    });

    //insert into mongodb
    // colllection.insert(jsonObj, (err,docs)=>{
    //      //get restaurant_id created by mongodb
    //      restaurant_id = doc[0]._id;11
    // })
}

const initRestaurant = fields => {
    //      i. restaurant_id
    //      not in create

    //      ii. name
    restaurant.name = fields.name;     //from user, String
    //      iii. borough
    if (fields.borough) {   //if something in fields.borough
        restaurant.borough = fields.borough;   //option, String
    }
    //      iv. cuisine
    if (fields.cuisine) {
        restaurant.cuisine = fields.cuisine;  //option, String
    }
    //      vii. address
    //          1. street
    if (fields.street) {
        address.street = fields.street;
    }
    //          2. building
    if (fields.building) {
        address.building = fields.building;
    }
    //          3. zipcode
    if (fields.zipcode) {
        address.zipcode = fields.zipcode;
    }
    //          4. coord
    //              1. lon
    if (fields.lon) {
        coord.lon = fields.lon;
    }
    //              2. lat
    if (fields.lat) {
        coord.lat = fields.lat;
    }
    if (fields.lon || fields.lat) {
        address.coord = coord;
    }
    if (address.street || address.building || address.zipcode || address.coord) {
        restaurant.address = address;
    }
    //      viii. grades
    //          1. user
    //          2. score
    //      not in create
    //      ix. owner

    //get from cookies
    restaurant.owner = "ramwong";
}


// Read
const read = (req) => {

}

// Update
const update = (criteria) => {

}

// Delete
// only requst on restaurant
const remove = (criteria) => {
}


// end of function for CRUD