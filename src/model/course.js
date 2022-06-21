const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    coursecode:{
        type:String,
        require:true
    },
    coursename: {
        type:String,
        require:true
    },
    year :{
        type:String,
        require:true
    },
    dept:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("course",courseSchema)