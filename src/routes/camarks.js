const express = require('express')
const camarks = require('../model/camarks')
const router = express.Router()



router.post('/add',async(req,res)=>{
    const {email,sem,year,dept,coursename,exam,marks} = req.body

    if(!email || !sem || !year || !dept || !coursename || !exam || !marks){
        return res.status(200).json({error:"All the fields are Mandatory!!",status:400})
    }
    
    const chkmarksforexam = await camarks.findOne({ sem,email,coursename,exam})
    if(chkmarksforexam){
        return res.status(200).json({error:"Marks already given for this exam of this subject in this semester!!",status: 422})
    }

    try
    {
       
        var newMarks = new camarks
        ({
            sem:        req.body.sem,
            year:       req.body.year,
            email:      req.body.email,
            dept:       req.body.dept,
            coursename: req.body.coursename,
            exam:       req.body.exam,
            marks:      req.body.marks
        })

        await newMarks.save().then(()=>{
            res.status(200).json({message:"Marks Added Successfully",status:200})
        }).catch(err=>{
            console.log("POST /CaMarks add HTTP/1.1 400" + Date.now())
        })

        
    }
    catch(err)
    {
        console.log(err)
    }

})




router.post('/getmarks',async(req,res)=>
{
    const {email,sem,exam}= req.body;
    try
    {
        var chkmarks = await camarks.find({ email,sem,exam });
        res.status(200).json(chkmarks);
    }
    catch(err)
    {
       res.status(500).json(err);
    }

})




module.exports = router