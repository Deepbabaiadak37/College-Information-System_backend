const express = require('express')
const attendance = require('../model/attendance')
const router = express.Router()



router.post('/markattendance',async(req,res)=>{
    var {email,date,year,dept,coursename,presentstatus,absentstatus} = req.body

    if(!email || !date || !year || !dept || !coursename){
        return res.status(500).json({error:"All the fields are Mandatory!!"})
    }
  //  console.log(presentstatus,absentstatus)
    if(absentstatus=="1")
    {
        presentstatus="1";
        absentstatus="0";
        const findattendance = await attendance.findOne({ date,email,coursename ,presentstatus ,absentstatus })
        if(findattendance)
        {
            const result=await attendance.updateOne({ "date":date,"email":email,"coursename":coursename,"presentstatus":"1","absentstatus":"0"},{$set : {
                "presentstatus":"0","absentstatus":"1"
            }})

           return  res.status(200).json(result);
        }
        
    }

    presentstatus=req.body.presentstatus;
    absentstatus=req.body.absentstatus;

    if(presentstatus=="1")
    {
        presentstatus="0";
        absentstatus="1";
        const findattendance = await attendance.findOne({ date,email,coursename ,presentstatus ,absentstatus })
        if(findattendance)
        {
            const result=await attendance.updateOne({ "date":date,"email":email,"coursename":coursename,"presentstatus":"0","absentstatus":"1"},{$set : {
                "presentstatus":"1","absentstatus":"0"
            }})

           return  res.status(200).json(result);
        }
    }
       
    presentstatus=req.body.presentstatus;
    absentstatus=req.body.absentstatus;

    const chkattendance = await attendance.findOne({ date,email,coursename ,presentstatus ,absentstatus })

    //console.log(presentstatus,absentstatus, chkattendance)
    if(chkattendance){
        return res.status(422).json({error:"attendance already given !!"})
    }

    try
    {
        var newattendance = new attendance
        ({
            date:           req.body.date,
            year:           req.body.year,
            email:          req.body.email,
            dept:           req.body.dept,
            coursename:     req.body.coursename,
            presentstatus:  req.body.presentstatus,
            absentstatus:   req.body.absentstatus
        })

        await newattendance.save().then(()=>{
            console.log("POST /attendance add HTTP/1.1 200 " + Date.now())
            res.status(200).json({message:"Attendance Added Successfully"})
        }).catch(err=>{
            console.log("POST /attendance add HTTP/1.1 400" + Date.now())
        })

        
    }
    catch(err)
    {
        console.log(err)
    }

})




router.post('/sendattendance',async(req,res)=>
{
    const email= req.body.email;
    console.log(email);
    try
    {
        var chkattendance = await attendance.find({ email });
        res.status(200).json(chkattendance);
    }
    catch(err)
    {
       res.status(500).json(err);
    }

})




module.exports = router