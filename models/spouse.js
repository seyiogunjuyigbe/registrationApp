var mongoose = require ("mongoose");
var spouseSchema = new mongoose.Schema({
        FirstName: String,
        LastName: String,
        PhoneNumber: Number,
        Email: String,
        DateOfBirth: Date,
        Address: String,
        Gender: String,
        Occupation: String,
        maritalStatus: {type: String, default: "Married"}
})


module.exports = mongoose.model('Spouse', spouseSchema)