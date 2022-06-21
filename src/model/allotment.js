const mongoose = require('mongoose')
const allotmentSchema = new mongoose.Schema({
    contact:{
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    room: {
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

module.exports = mongoose.model("allotment",allotmentSchema)