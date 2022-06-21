const express = require('express')
const teacher = require('../model/teacher')
const router = express.Router()

router.post('/',async(req,res)=>{
    try
    {
        var newteacher = new teacher
        ({
            address:        req.body.address,
            email:          req.body.email,
            contact:        req.body.contact,
            name:           req.body.name,
            designation:    req.body.designation,
            type:           req.body.type
        });
        await newteacher.save().then(()=>{
           
           return  res.status(200).json({message:"teacher added Successfully",status:   200});
        }).catch(err=>{
           return  res.status(400).json({status: 400, msg:err});
        })
    }
    catch(err)
    {
        console.log(err)
    }

});

router.get('/showteachers',async(req,res)=>{
    try
    {
        var details=await teacher.find({});
        console.log(details);
        return res.status(200).json(details);
    }
    catch(err)
    {
        return res.status(500).json({});
    }
});

module.exports = router