const express = require('express')
const bcryptjs = require('bcryptjs')
const Notice = require('../model/notice')
const router = express.Router()



router.post('/',async(req,res)=>{
    try
    {
        var newnotice = new Notice
        ({
            notice: req.body.notice,
            date:req.body.date,
            time:req.body.time
        });

        await newnotice.save().then(()=>{

            return   res.status(200).json({message:"Notice added Successfully",status:200});
        }).catch(err=>{
            return   res.status(200).json({status:400,msg:err});
        })
        
    }
    catch(err)
    {
        console.log(err)
    }

})



router.get('/shownotice',async(req,res)=>{
    try
    {
        var details=await Notice.find({});
        return res.status(200).json(details);
    }
    catch(err)
    {
        return res.status(500).json({});
    }
})

router.delete('/delete',async(req,res)=>{
    try
    {
        var details=await Notice.deleteOne({"_id":req.body.id});
        return res.status(200).json(details);
    }
    catch(err)
    {
        return res.status(500).json({});
    }
})

module.exports = router