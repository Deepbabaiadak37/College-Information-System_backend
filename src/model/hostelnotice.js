const mongoose = require('mongoose')
const hostelnoticeSchema = new mongoose.Schema({
    notice:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("hostelnotice",hostelnoticeSchema);