var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Member     = require("../models/members"),
    Child    = require("../models/children");

//New child Route
router.get("/new", function(req, res){
    //find member by Id
    Member.findById(req.params.id, function(err, member){
        if(err){
            console.log(err)
        } else {
           
            res.render('members/children/new', {member: member});
        }
    })
})

router.post("/new", function(req, res){
    Member.findById(req.params.id, function(err, member){
        if(err){
            conole.log(err);
       } else{
            var child = req.body.child;
               Child.create(child, function(err, child){
                if(err){
                    console.log(err)
                } else{
                    member.children.push(child);
                    member.save();
                    console.log(child)
                  
                    res.redirect("/members/" + member._id + "/children")
                }
            }) 
            }
        });
    })


//Show Single member with children
router.get("/", function(req, res){
    Member.findById(req.params.id).populate(["children", "Spouse"]).exec(function(err, thisMember){
        if(err){
            res.send(err)
        } else{
           
            res.render("members/show", {member: thisMember})
            
        }
    })
    
    
})


//Edit child details
router.get("/:children_id/edit", function(req, res){
    Child.findById(req.params.children_id, function(err, child){
        if(err){
            console.log(err)
        } else {
            res.render("members/children/edit", {member_id: req.params.id, child: child});
            // console.log(member_id);
        }
    })
})



//Update child
router.put("/:children_id", function(req, res){
    Child.findByIdAndUpdate(req.params.child_id, req.body.child, function(err, child){
        if(err){
            console.log(err)
        } else{
            res.redirect("/members/" + req.params.id + "/children")
        }
    })
    
})

//Delete child
router.get("/:children_id/delete", function(req, res){
    Child.findByIdAndRemove(req.params.child_id, function(err, child){
        if(err){
            console.log(err)
        } else{
            res.redirect("/members/" + req.params.id + "/children")
            console.log("child deleted")
        }
    })
})

module.exports = router;