var mongoose = require("mongoose");
var childSchema = new mongoose.Schema({
    FirstName: String,
    LastName : String,
    Gender : String,
    DateOfBirth : Date
 })

module.exports = mongoose.model('Child', childSchema)