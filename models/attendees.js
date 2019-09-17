var mongoose = require ("mongoose");
var attendeeSchema = new mongoose.Schema ({

    'FirstName': String,
    'LastName' : String,
    'PhoneNumber' : Number,
    'Email' : String,
    'Address' : String,
    'Gender' : String,
    'isMarried': String,
     'ifChildren': String,
     'numberOfChildren' : Number,
    'ifSpecialAccomodation' : String,
    'Price' : Number,
    'acomodationDetails' : String,
    'Destination' : String
});
   
module.exports = mongoose.model('Attendee', attendeeSchema);