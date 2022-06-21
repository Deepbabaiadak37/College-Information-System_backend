const express = require('express')
const bcryptjs = require('bcryptjs')
const forgotpasswordtable = require('../model/forgotpassword')
const MemberTable = require('../model/member')


var nodemailer=require('nodemailer');
var otpGenerator = require('otp-generator')
const router = express.Router()



router.post('/', async (req, res) => 
{
    const email=req.body.email;
    const chkemail=await MemberTable.findOne({ email});

    if(!chkemail)
        return res.status(200).json({ msg: "Email doesn't exist !!",status:400});

    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'deekumaradak@gmail.com',
            pass:"ctaixjxslmkqtxqy"
        }
    });

    var OTP=otpGenerator.generate(6, { upperCase: true, specialChars: true ,alphabets :false,digits:true});

    var newdata=new forgotpasswordtable({
        "email":email,
        "otp":OTP
    })

    var mailOptions={
        from:"deekumaradak@gmail.com",
        to:email,    
        subject:"College Information System : Your One Time Otp ",
        text:"Your One Time 6 digit OTP is : [  "+OTP+"  ]"

    };

    var findemail=await forgotpasswordtable.findOne({ "email" : email});
    if(findemail)
    {
        await forgotpasswordtable.updateOne({ "email" : email},{ $set :{ "otp" : OTP}}).then(()=>{
            transporter.sendMail(mailOptions,function(error,info){
                if(error) return res.status(200).json({ msg: "Email not sent !! ",status:400 })
                else 
                {
    
                    return res.status(200).json({ msg :"Email sent !! check OTP ..",status:200 })
                }   
            })
        }).catch(err=>{
            return res.status(200).json({ msg : err, status :400})
        })
    }
    else
    {
        await newdata.save().then(()=>{

            transporter.sendMail(mailOptions,function(error,info){
                if(error) return res.status(200).json({ msg: "Email not sent !! ",status:400 })
                else 
                {
    
                    return res.status(200).json({ msg :"Email sent !! check OTP ..",status:200 })
                }   
            })
     
        }).catch(err=>{
         return res.status(200).json({ msg : err, status :400})
        })
    
    }

})


router.post('/matchotp',async(req,res)=>{

    const {otp,email}=req.body;

    const findemail=await forgotpasswordtable.findOne({ email});
    if(!findemail)
        return res.status(200).json({ msg:'Email not found !!',status:422});
    
    const chkotpvalid=await forgotpasswordtable.findOne({ email,otp});
    if(chkotpvalid)
        return res.status(200).json({ msg:'Otp Matched !!',status: 200});
    else
        return res.status(200).json({ msg:'OTP mismatch !!',status: 422});

});


router.post('/changepassword',async(req,res)=>{
    const {password,email}=req.body;
    const findemail=await MemberTable.findOne({ email});
    if(!findemail)
        return res.status(200).json({ msg:'Email not exists ',statu: 422});


    const salt = await bcryptjs.genSalt()
    const hashedpassword = await bcryptjs.hash(req.body.password,salt)
    await MemberTable.updateOne({ 'email': email },{ $set : { 'password': hashedpassword}}).then(()=>{
        return  res.status(200).json({   msg : "Password changed Successfully" , status : 200})
     }).catch(err=>{
         return res.status(200).json({ msg : err, status : 422})
     })

});


module.exports = router