const mongoose = require('mongoose')
const noticeSchema = new mongoose.Schema({
    notice:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("notice",noticeSchema);