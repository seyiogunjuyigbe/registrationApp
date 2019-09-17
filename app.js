const express = require('express');
const app = express();
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
var methodOverride = require('method-override'),
    request         = require('request'),
    flash           = require('connect-flash'),
    json2xls = require('json2xls');
    var nodeExcel = require('excel-export');

var programRoutes   = require("./routes/programs"),
    attendeeRoutes  = require("./routes/attendees"),
    memberRoutes    = require('./routes/members'),
    spouseRoutes    = require('./routes/spouse'),
    childrenRoutes  = require('./routes/children');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/regApp', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
 

var Attendee = require("./models/attendees");
var Program = require ("./models/programs");
var Child = require ("./models/children");
var Member = require ('./models/members');


app.use("/programs", programRoutes);
app.use('/programs/:id/attendees', attendeeRoutes);
app.use('/members', memberRoutes);
app.use('/members/:id/children', childrenRoutes);
app.use('/members/:id/spouse', spouseRoutes)

//Index Route - Landing Page 
app.get("/", function(req, res){
    // res.render('home');
    request('https://jsonmock.hackerrank.com/api/movies/search/?Title="great"', function(error, response, body){
        if(error){
            console.log(error);
        } else if(!error && response.statusCode == 200){
            
            res.send(body);
            
        }
    })
})








app.listen(3000, process.env.IP, function(){
    console.log("Reg App is online");
})
