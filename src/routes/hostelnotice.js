const express = require('express')
const HostelNotice = require('../model/hostelnotice')
const router = express.Router()



router.post('/',async(req,res)=>{
    try
    {
        var newnotice = new HostelNotice
        ({
            notice: req.body.notice,
            date: Date.now()
        });

        await newnotice.save().then(()=>{
            
           return  res.status(200).json({ msg :"Notice added Successfully",status: 200});
        })
        .catch(err=>{
            return res.status(200).json({ msg : err, status:422})
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
        var details=await HostelNotice.find({});
        console.log(details)
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
        var details=await HostelNotice.deleteOne({"_id":req.body.id});
        return res.status(200).json({msg: "Deleted Successfully !!", status: 200});
    }
    catch(err)
    {
        return res.status(200).json({ msg :err ,status: 422});
    }
})


module.exports = router