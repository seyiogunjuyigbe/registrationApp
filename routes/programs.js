var express = require('express');
var router = express.Router({mergeParams: true});
var Program = require("../models/programs");

//New Program Route
router.get("/new", function(req, res){
    res.render("programs/new")
})

//Create Program route
router.post("/new", function(req, res){
    var program = req.body.Program;
    Program.create(program, function(err, program){
        if(err){
            console.log(err)
        } else{
            console.log("Program Added to DB");
            console.log(program);
        }
    })    
    res.redirect("/programs");
    })



//Show All Programs
router.get("/", function(req, res){
Program.find({}, function(err, Programs){
    if(err){
        console.log(err)
    } else{
        res.render('programs/list', {Programs: Programs});
    }
})    
})


//Edit Program Details
router.get("/:id/edit", function(req, res){
    Program.findById(req.params.id, function(err, program){
        if(err){
            console.log(err)
        } else{
            res.render("programs/edit", {program: program})
        }
    })
})

//Update Program
router.put("/:id", function(req, res){
    Program.findByIdAndUpdate(req.params.id, req.body.program, function(err, program){
        if(err){
            console.log(err)
        } else{
            
               res.redirect('/programs')
               console.log("program edited")
        }
    })
})


//Delete Program
router.get("/:id/delete", function(req, res){
    Program.findByIdAndRemove(req.params.id, function(err, program){
        if(err){
            console.log(err)
        } else{
                console.log("program deleted");
                res.redirect("/programs");
        }
    })
})


module.exports = router;