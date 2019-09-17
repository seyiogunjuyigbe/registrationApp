var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var Member = require("../models/members");
var Spouse = require("../models/spouse");


//New member Route
router.get("/new", function(req, res){
    res.render("members/new")
})


//Create member route
router.post("/new", function(req, res){
    var member = req.body.member;
    Member.create(member, function(err, member){
        if(err){
            console.log(err)
        } else{
            console.log("member Added to DB");
            console.log(member);
            };
    })

            res.redirect("/members");
    });


//Show All members
router.get("/", function(req, res){
Member.find({}, function(err, members){
    if(err){
        console.log(err)
    } else{
        res.render('members/list', {members: members});
        
        }
})    
})


//Edit member Details
router.get("/:id/edit", function(req, res){
    Member.findById(req.params.id, function(err, member){
        if(err){
            console.log(err)
        } else{
            res.render("members/edit", {member: member})
        }
    })
})

//Update member
router.put("/:id", function(req, res){
    Member.findByIdAndUpdate(req.params.id, req.body.member, function(err, member){
        if(err){
            console.log(err)
        } else{
                res.redirect('/members')
        }
    })
})


//Delete member
router.get("/:id/delete", function(req, res){
    Member.findByIdAndRemove(req.params.id, function(err, member){
        if(err){
            console.log(err)
        } else{
                console.log("member deleted");
                res.redirect("/members");
        }
    })
});

router.get("/find/:query", function(req, res){
 console.log(req.params)
    Member.find({}, function(err, found){
        let query = req.params.query;
        queryList = [];
        if(err){
            console.log(err)
        } else if(found.length == 0) {
            console.log("nothing found");
            res.send("Nothing found, try another search item")
        }
            else {
         found.forEach(function(member){ 
              queryList.push(member[query]);
                          
               }) 
            
               Spouse.find({}, function(err, spouses){
                   if(err){
                       console.log(err)
                   } else{
                       spouses.forEach(function(spouse){
              queryList.push(spouse[query]);
            //   console.log(spouse[query]);

                         })
                   }
        
                 res.render("members/results", {results: queryList, query: query});  
               })
               
    }});
})

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

router.get("/all/export", function(req, res){ 
    Member.find({}, function(err, members){
        if(err){
            console.log(err)
        } else{
            res.send(members);
            var json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
}

var xls = json2xls(json);

// fs.writeFileSync('data.xlsx', xls, 'binary');
        }
    })
     
    
})
// router.get("/search/:category/:query", function(req, res){
//     var category = req.params.category;
//     var query = {};
//     query.category = req.params.query;
//     console.log(query);
//     res.send(query)
// })

module.exports = router
