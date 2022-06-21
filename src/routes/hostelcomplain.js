const { response } = require('express');
const express = require('express');
const hostelcomplain = require('../model/complain')
const router = express.Router()



router.post('/',async(req,res)=>{
    try
    {
        var newcomplain = new hostelcomplain
        ({
            details:        req.body.details,
            roomno:         req.body.roomno,
            contact:        req.body.contact,
            name:           req.body.name,
            complainstate:  false
        });

        await newcomplain.save().then(()=>{

           return  res.status(200).json({message:"complain added Successfully"});
        }).catch(err=>{
            
            return res.status(400).json(err);
        })
        
    }
    catch(err)
    {
        console.log(err)
    }

})


router.get('/showcomplains',async(req,res)=>{
    try
    {
        var details=await hostelcomplain.find({});
        return res.status(200).json(details);
    }
    catch(err)
    {
        return res.status(500).json({});
    }
})






router.post('/markdonecomplain',async(req,res)=>{
    try
    {
        hostelcomplain.updateOne(
            { _id :  req.body.id}, {$set:{complainstate: true}}  , function(err, res) {
                if (err) throw err;
                console.log(" updated");
              });
        
        return res.status(200).json("update done")
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({});
    }
})






router.post('/deletecomplain',async(req,res)=>{
    try
    {
        hostelcomplain.deleteOne(
            { _id :  req.body.id},function(err, res) {
                if (err) throw err;
                console.log(" deleted");
              });
        
        return res.status(200).json("update done")
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({});
    }
})




module.exports = router