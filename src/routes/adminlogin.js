const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AdminTable = require('../model/admin')
const router = express.Router()

router.post('/add', async (req, res) => 
{
  
        const email = req.body.email
        const type=req.body.type
        const password = req.body.password
       
        const member = await AdminTable.findOne({ email:email,type:type})
        if(member)
        {
          return   res.status(200).json({ msg:"Member Already Present",status:422});
        }
        const salt = await bcryptjs.genSalt()
        const hashedpassword = await bcryptjs.hash(req.body.password,salt)
        var newmember = new AdminTable
        ({
            email:      req.body.email,
            password:   hashedpassword,
            type:       req.body.type
        })

        await newmember.save().then(()=>{
            
           return  res.status(200).json({msg:"Admin Registered Successfully",status:200});
        }).catch(err=>{
           return res.status(200).json({ msg:err,status:422});
        })

} )

router.post('/getadmins',async(req,res)=>{

     const type=req.body.type;
    try 
    {
        const details=await AdminTable.find({ type:type});
        res.status(200).json(details);
    } 
    catch (error) 
    {
        res.status(500).json(error);
    }
})



router.delete('/deleteadmin',async(req,res)=>{
    const {_id} = req.body;

    if(!_id ){
        return res.status(422).json({error:"No Details !!"})
    }
    const ans=await AdminTable.deleteOne({"_id":_id});
    
    res.json(ans);
})




router.post('/changepassword',async(req,res)=>{
    const {_id,password} = req.body;

    if(!_id ){
        return res.status(422).json({error:"No Details !!"})
    }
    const salt = await bcryptjs.genSalt(3)
    const hashedpassword = await bcryptjs.hash( password, salt)
    const ans=await AdminTable.updateOne({"_id":_id} ,{ $set: { "password" : hashedpassword } });
    res.json(ans);
})





router.post('/', async (req, res) => 
{
    if (req.body.token != null) 
    {
        try {
            jwt.verify(req.body.token, "private-key", (err, decoded) => {
                if (err) return res.status(401).json({
                    msg: "Unauthenticated_access"
                })
                return res.status(200).json({
                    msg: "Verified"
                })
            })
        } catch (e) {
           return  res.status(500).json({})
        }
    } 
    else 
    {
        const email = req.body.email
        const password = req.body.password
        const type=req.body.type

        if (!email || !password || !type) 
        {
            return res.status(422).json({
                error: "please add email or password"
            })
        }

        try {
            const member = await AdminTable.findOne({ email:email,type:type})
           
            if (!member) 
            {
               return  res.status(200).json({
                    msg: "Invalid email",status:401
                })
            } 
            else
            {
                if (await bcryptjs.compare(password, member.password)) 
                {

                    const payload = {
                        _id:    member._id,
                        email:  email,
                        type:   member.type
                    }
                    const token = jwt.sign(payload, "private-key", {
                        expiresIn: '24h'
                    })

                   return  res.status(200).json({  "token": token,"result": "ok" ,status:200   })
                } 
                else 
                {
                   return  res.status(200).json({
                        msg: "Invalid Password",status: 400
                    })
                }
            }
        } 
        catch (err) 
        {
            console.log(err)
        }
    }
})




       

module.exports = router