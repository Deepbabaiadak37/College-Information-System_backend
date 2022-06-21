const mongoose=require('mongoose');
const teacherSchema=new mongoose.Schema({


    name: {
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true
    },
    designation :{
        type:String,
        require:true
    },
    type :{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("teacher",teacherSchema)