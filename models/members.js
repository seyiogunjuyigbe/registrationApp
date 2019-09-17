var mongoose = require("mongoose");

var memberSchema = new mongoose.Schema({
    FirstName: String,
    LastName : String,
    PhoneNumber : Number,
    Email : String,
    DateOfBirth: String,
    Address : String,
    Gender : String,
    Occupation: String,
    Category: String,
    maritalStatus: String,
    Spouse: [{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Spouse'
    }],
    ifChildren: String,
    numberOfChildren : Number,
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Child'
        }
    ]
    

})

module.exports = mongoose.model('Member', memberSchema)