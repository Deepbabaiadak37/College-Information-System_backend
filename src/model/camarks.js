const mongoose = require('mongoose')
const camarksSchema = new mongoose.Schema({
    email:
    {
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
    },
    exam:{   
        type:String,
        require:true
    },
    sem:{
        type:String,
        require:true
    },
    marks:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("camarks",camarksSchema)