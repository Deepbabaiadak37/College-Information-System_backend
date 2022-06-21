const express = require('express')
const Allotment = require('../model/allotment')
const router = express.Router()



router.post('/',async(req,res)=>{
    try
    {
        var newAllotment = new Allotment
        ({
            name:       req.body.name,
            contact:    req.body.contact,
            room:       req.body.room,
            year:       req.body.year,
            dept:       req.body.dept
        });
        const room=req.body.room;
        const find = await Allotment.findOne({ room })

        if (find) 
        {
           return  res.status(200).json({ status: 422});
        } 
        else
        {
            await newAllotment.save().then(()=>{
               return  res.status(200).json({message:"Allotment added Successfully",status:200});
            })
            .catch(err=>{
                return res.status(400).json({ status: 400})
            })
        }
       
        
    }
    catch(err)
    {
        console.log(err)
    }

})



router.post('/allotmentview',async(req,res)=>{
    try
    {
        const year=req.body.year;

        var details=await Allotment.find({ year });
        return res.status(200).json(details);
    }
    catch(err)
    {
        return res.status(500).json({err});
    }
})



module.exports = router