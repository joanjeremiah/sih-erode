const express = require('express')
const checkAuth = require("../middlewares/check-auth");
const Profile = require('../models/profile');

const router = express.Router();

router.post("/create", checkAuth,
    (req, res, next) => {
       
        
        const url = req.protocol + "://" + req.get("host")
        console.log(url)
        const profile = new Profile({
            username: req.body.username,
            bio: req.body.bio,
            imagePath: url + "/images/" + req.file.filename,
            creator: req.userData.userId
        })
   
          Profile.findOne({creator: req.userData.userId}).then(user1=>{
            if(user1){
              
              return res.status(401).json({
                message: "Profile Already Exist"
              })
            }
            return  profile.save()
        }).then(prof => {
          
            if(!prof){
                return res.status(500).json({
                  message: "Error Creating Profile"
                })
              }
              res.status(201).json({
                message: "Profile created!",
                profile: prof
              });

            })
            .catch(e => {
                console.log("error is",e)
            })
    })

    router.put(
        "/edit/:id",
        checkAuth,
        (req, res, next) => {
            let imagePath = req.body.imagePath;
            const url = req.protocol + "://" + req.get("host")
            if (req.file) {
                const url = req.protocol + "://" + req.get("host");
                imagePath = url + "/images/" + req.file.filename
            }
         
            const profile = new Profile({
                _id: req.body.id,
                username: req.body.username,
                bio: req.body.bio,
                imagePath:imagePath,
                creator: req.userData.userId
            })
           
            Profile.updateOne(
                { _id: req.params.id, creator: req.userData.userId },
                profile
              ).then(result => {
                if(result){
                    res.status(200).json({ message: "Update successful!" });
                }
                
                else {
                    res.status(500).json({ message: "Error Upating Profile" });
                }
            })
            .catch(e=>{
                res.status(500).json({ message: "Error Upating Profile ,Username taken" });
                console.log(e)
            });
        }
    );
    
    router.get("/profiles",
    (req, res, next) => {
        Profile.find().then(prof => {
            if (prof) {
              
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        })
        .catch(e=>{
            console.log(e)
        });
    });
  
    

router.get("/viewprofile", checkAuth,
    (req, res, next) => {
        Profile.findOne({ creator: req.userData.userId }).then(prof => {
            if (prof) {
              
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    });


    
router.get("/bycreator/:id",
(req, res, next) => {
    Profile.findOne({ creator: req.params.id }).then(prof => {
        if (prof) {
          
            res.status(200).json({
                message: "Profile fetched successfully!",
                profile: prof
            });
        } else {
            res.status(404).json({ message: "Profile not found!" });
        }
    });
});
    


module.exports = router