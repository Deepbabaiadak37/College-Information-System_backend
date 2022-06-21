const express = require('express')
const course = require('../model/course')
const router = express.Router()



router.post('/',async(req,res)=>{
    const {coursename,coursecode,year,dept} = req.body
    if(!coursename || !coursecode || !year || !dept){
        return res.status(422).json({error:"All the fields are Mandatory!!"})
    }

    const chkcourse = await course.findOne({coursename})
    if(chkcourse){
        return res.status(422).json({error:"course already exists !!"})
    }

    try
    {
       
        var newcourse = new course
        ({
            coursename:   req.body.coursename,
            year:       req.body.year,
            coursecode:   req.body.coursecode,
            dept:       req.body.dept
        })

        await newcourse.save().then(()=>{
            return   res.status(200).json({message:"Course Added Successfully",status: 200});
        }).catch(err=>{
            return res.status(200).json({ status: 400});
        })

        
    }
    catch(err)
    {
        console.log(err)
    }

})



router.post('/getcourse',async(req,res)=>{
    const {year,dept} = req.body;
    console.log(year,dept)
    if(!year || !dept){
        return res.status(422).json({error:"No Details are there to search !!"})
    }
    var chkcourse = await course.find({ year,dept });
    
    res.json(chkcourse);
})





router.delete('/deletecourse',async(req,res)=>{
    const {_id} = req.body;

    if(!_id ){
        return res.status(422).json({error:"No Details !!"})
    }
    const ans=await course.deleteOne({"_id":_id});
    
    res.json(ans);
})


module.exports = router