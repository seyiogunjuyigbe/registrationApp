var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Program     = require("../models/programs"),
    Attendee    = require("../models/attendees");

//New Attendee Route
router.get("/new", function(req, res){
    //find Program by Id
    Program.findById(req.params.id, function(err, program){
        if(err){
            console.log(err)
        } else {
            res.render('attendees/new', {program: program});
        }
    })
})

router.post("/new", function(req, res){
    Program.findById(req.params.id, function(err, program){
        if(err){
            conole.log(err);
       } else{
            var attendee = req.body.attendee;
               Attendee.create(attendee, function(err, attendee){
                if(err){
                    console.log(err)
                } else{
                    program.attendees.push(attendee);
                    program.save();
                    console.log(attendee)
                    console.log("added to " + program)
                    res.redirect("/programs/" + program._id + "/attendees")
                }
            }) 
            }
        });
    })


//Show Single Program with attendees
router.get("/", function(req, res){
    Program.findById(req.params.id).populate("attendees").exec(function(err, thisProgram){
        if(err){
            console.log(err)
        } else{
            res.render("programs/show", {program: thisProgram})
        }
    })
    
})


//Edit Attendee details
router.get("/:attendees_id/edit", function(req, res){
    Attendee.findById(req.params.attendees_id, function(err, attendee){
        if(err){
            console.log(err)
        } else {
            res.render("attendees/edit", {program_id: req.params.id, attendee: attendee})
        }
    })
})



//Update Attendee
router.put("/:attendees_id", function(req, res){
    Attendee.findByIdAndUpdate(req.params.attendee_id, req.body.attendee, function(err, attendee){
        if(err){
            console.log(err)
        } else{
            res.redirect("/programs/" + req.params.id + "/attendees")
        }
    })
    
})

//Delete Attendee
router.get("/:attendees_id/delete", function(req, res){
    Attendee.findByIdAndRemove(req.params.attendees_id, function(err, attendee){
        if(err){
            console.log(err)
        } else{
            res.redirect("/programs/" + req.params.id + "/attendees")
            console.log("attendee deleted")
        }
    })
})


router.get("/find/:query", function(req, res){
    Program.findById(req.params.id).populate("attendees").exec(function(err, thisProgram){
        if(err){
            console.log(err)
        } 
        else if(thisProgram.attendees.length == 0){
            res.send("Nothing found... try again")
            
        }
        else {
            var queryList = []; 
            var query = req.params.query;
            console.log(req.params)
            console.log(query)
                thisProgram.attendees.forEach(function(attendee){ 
                 queryList.push(attendee[query]);
                              })
                res.render("attendees/results", {results: queryList, query: query});  
                     }
                      })
                });
                  
  
   
   router.get("/all/bulksms", function(req, res){
       // res.send('BULK SMS ROUTE')
       // https://smartsmssolutions.com/api/json.php?
       var smsList = req.query.recipients;
       var sender = req.query.subject;
       var message = req.query.message;
   
       request("https://smartsmssolutions.com/api/json.php?&sender=" + sender + "&to=" + smsList + "&message=" + message + "&type=0&token=VZtzrPbfChTUCmMl38xfZTntVolPff0JQBuhFOJvStSYNbol6GX2dID1pZgao4ocsH0AUk3I3XwuhU2h5v08V5odLdfN6UodIO2P", function(error, response, body){
           if(error){
               console.log(error);
           } else if(!error && response.statusCode == 200){
               // res.send("SMS Sent to all");
               // console.log(smsList + " " + sender + " " + message);
               res.redirect('back');
           }
       })
   });
   
   router.get("/all/bulkmail", function(req, res){
       // res.send('BULK MAIL ROUTE')
       var mailList = req.query.recipients;
       var subject = req.query.subject;
       var message = req.query.message;
   
       request("https://mail.google.com/mail/?view=cm&fs=1&to=" + mailList + "&su=" + subject + "&body=" + message, function(error, response, body){
           if(error){
               console.log(error)
           } else if(!error && response.statusCode == 200){
                         res.redirect('back');
           }
       })
   });

module.exports = router;