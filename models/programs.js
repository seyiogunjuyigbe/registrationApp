var mongoose = require("mongoose");
var programSchema = new mongoose.Schema({
    title: String,
    date: String,
    theme: String,
    category: String,
    audience: String,
    venue: String,
    genderCategory: String,
    attendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee"
        }
     ]
}); 

module.exports = mongoose.model('Program', programSchema)