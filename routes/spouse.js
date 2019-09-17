var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Member     = require("../models/members"),
    Spouse    = require("../models/spouse");

//New Spouse Route
router.get("/new", function(req, res){
    //find member by Id
    Member.findById(req.params.id, function(err, member){
        if(err){
            console.log(err)
        } else {
            res.render('members/spouse/new', {member: member});
        }
    })
})
//Create Spouse Route
router.post("/new", function(req, res){
    Member.findById(req.params.id, function(err, member){
        if(err){
            console.log(err);
       } else{
        var spouse = req.body.spouse;
        Spouse.create(spouse, function(err, spouse){
         if(err){
             console.log(err)
         } else{
             member.Spouse.push(spouse);
             member.save();
            console.log(spouse + spouse.FirstName);
             console.log('spouse added to member profile')
             res.redirect("/members/" + member._id + "/children")
         }
     }) 
    //  Member.create(member.Spouse, function(err, spouse){
    //     if(err){
    //         console.log(err)
    //     } else{
    //         console.log("Spouse added to membership data")
    //         }; 
    //     });
     
   
            }
        });
    })


//Show Single member with Spouse
router.get("/", function(req, res){
    Member.findById(req.params.id).populate("spouse").exec(function(err, thisMember){
        if(err){
            console.log(err)
        } else{
            res.render("members/show", {member: thisMember})
        }
    })
    
})


//Edit Spouse details
router.get("/:spouse_id/edit", function(req, res){
    Spouse.findById(req.params.spouse_id, function(err, spouse){
        if(err){
            console.log(err)
        } else {
            res.render("members/spouse/edit", {member_id: req.params.id, spouse: spouse})
        }
    })
})



//Update Spouse details
router.put("/:spouse_id", function(req, res){
    Spouse.findByIdAndUpdate(req.params.spouse_id, req.body.spouse, function(err, spouse){
        if(err){
            console.log(err)
        } else{
            res.redirect("/members/" + req.params.id + "/children")
        }
    })
    
})

//Delete Spouse details
router.get("/:spouse_id/delete", function(req, res){
    Spouse.findByIdAndRemove(req.params.spouse_id, function(err, spouse){
        if(err){
            console.log(err)
        } else{
            res.redirect("/members/" + req.params.id + "/children")
            console.log("spouse deleted")
        }
    })
})

module.exports = router;