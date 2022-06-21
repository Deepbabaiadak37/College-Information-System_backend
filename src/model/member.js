const mongoose = require('mongoose')
const memberSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    username: {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    year :{
        type:String,
        require:true
    },
    created_at:{
        type:Date,
        require:true,
        default:Date.now()
    },
    active:{
        type:Boolean,
        require:true,
        default:true
    },
    verified:{
        type:Boolean,
        require:true,
        default:false
    },
    dept:{
        type:String,
        require:true
    },
    imageUrl:
    {
        type:String,
        require:true   
    }
})

module.exports = mongoose.model("members",memberSchema)