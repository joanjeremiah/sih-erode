const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      console.log(req.body);
      const user = new User({
        email: req.body.email,
        username: req.body.name,
        password: hash
      });

      User.findOne({email:req.body.email}).then(user1=>{
        if(user1){
          return res.status(401).json({
            message: "User Already Exist"
          })
        }

        user.save().then(result => {
          if(!result){
            return res.status(500).json({
              message: "Error Creating USer"
            })
          }
          res.status(201).json({
            message: "User created!",
            result: result
          });
      })
        })   
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });;
    })
   
  });


  router.post("/login", (req, res, next) => {
    console.log(req.body);
    let fetchedUser;
  
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      console.log(fetchedUser)
      if(!result){
        return res.status(401).json({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(e=>{
     
      console.log(e)
    
    })
  })

  router.get('/all',checkAuth,(req,res) => {
    console.log('received')
    User.find({}).then(users=>{
      console.log(users);
      res.json(users)
    })

  })

  router.get('/:id',checkAuth,(req,res) => {
    console.log('user data')
    User.findOne({_id: req.params.id}).then(users=>{
      console.log(users);
      res.json(users)
    })
  })

  router.post('/setAvatar/:id',checkAuth,async (req,res) => {
    console.log('set avatar')
    try {
        const userid = req.params.id;
  
        const avatarImage = req.body.image;
        
        const userData =  await User.findByIdAndUpdate(userid,
        
        {
          isAvatarImageSet:true,
          avatarImage},
          { new: true }
        
        );
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage});
    } catch (ex) {
      next(ex);
    }
  })

  router.post('/score/add',checkAuth,async (req,res) => {
    console.log(req.userData)
    console.log(req.body)
    const update = await User.update(
      { _id: req.userData.userId}, 
      { $push: { scores: {value: req.body.score} } }
    )
    // console.log(update)
    res.json({message: 'Score saved!'})
  })

module.exports = router