const express = require('express')
const bcryptjs = require('bcryptjs')
const member = require('../model/member')
const router = express.Router()

const multer =  require('multer')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./profile-uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post('/profileupdate',upload.single('image'), async(req, res) => {
  
    try {
        var result =await member.updateOne({  "_id": req.body._id   },   { $set: { imageUrl: 'http://localhost:3001/profile-images/' +req.file.originalname }})
        return res.status(200).json(result);
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({err});
    }
})





router.post('/',async(req,res)=>{
    const {username,email,year,password,dept} = req.body
    if(!email || !password || !username || !year || !dept){
        return res.status(200).json({ msg:"All the fields are Mandatory!!", status:422})
    }

    const chkmember = await member.findOne({email})
    if(chkmember){
        return res.status(200).json({msg :"User already exists !!",status:422})
    }

    try
    {
        const salt = await bcryptjs.genSalt()
        const hashedpassword = await bcryptjs.hash(req.body.password,salt)
        var newmember = new member
        ({
            email:      req.body.email,
            username:   req.body.username,
            year:       req.body.year,
            password:   hashedpassword,
            verified:   true,
            dept:       req.body.dept,
            imageUrl:   ""
        })

        await newmember.save().then(()=>{
           return  res.status(200).json({   msg : "User Registered Successfully" , status : 200})
        }).catch(err=>{
            return res.status(200).json({ msg : err, status : 422})
        })

        
    }
    catch(err)
    {
        console.log(err)
    }

})



router.post('/getusers',async(req,res)=>{
    const {year,dept} = req.body;

    if(!year || !dept){
        return res.status(422).json({error:"No Details are there to search !!"})
    }
    var chkmember = await member.find({ year,dept });
    
   return res.status(200).json(chkmember);
})




module.exports = router