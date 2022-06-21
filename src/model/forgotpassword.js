const mongoose = require('mongoose')
const forgotpasswordSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:
    {
        type:String,
        require:true
    }
})

module.exports = mongoose.model("forgotpassword",forgotpasswordSchema)