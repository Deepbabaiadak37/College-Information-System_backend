const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const MemberTable = require('../model/member')

const router = express.Router()

router.post('/', async (req, res) => 
{
    if (req.body.token != null) 
    {
        try {
            jwt.verify(req.body.token, "private-key", (err, decoded) => {
                if (err) return  res.status(200).json({
                    msg : "unauthenticated_access" ,status:422
                })
                return res.status(200).json({
                    msg: "ok" ,status:200
                })
            })
        } catch (e) {
           return  res.status(200).json({ msg : e,status:  422})
        }
    } 
    else 
    {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) 
        {
           return  res.status(200).json({
                msg: "please add email or password",status:422
            })
        }

        try {
            const member = await MemberTable.findOne({
                email: email
            })

            if (!member) 
            {
              return   res.status(200).json({
                    msg: "Invalid email",status:422
                })
            } 
            else
            {
                if (await bcryptjs.compare(password, member.password)) {
                    const payload = {
                        _id: member._id,
                        email: email,
                        name:member.username
                    }
                    const token = jwt.sign(payload, "private-key", {
                        expiresIn: '24h'
                    })

                   return  res.status(200).json({
                        "token": token,
                        "result": "ok",
                        status:200
                    })
                } 
                else 
                {
                   return  res.status(200).json({
                        msg: "Invalid Password",status:422
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



router.post('/getuserimage',async(req,res)=>{

   const id=req.body.id;
    try {
        const result=await MemberTable.findOne({ _id:id });
        return res.status(200).json(result);
        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
})

module.exports = router