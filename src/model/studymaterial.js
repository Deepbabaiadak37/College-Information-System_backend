const mongoose = require('mongoose')
const studymaterialSchema = new mongoose.Schema({
    
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
    date:
    {
        type:String,
        require:true

    },
    about:
    {
        type:String,
        require:true
    },
    imageUrl:
    {
        type:String,
        require:true
    }

});

module.exports = mongoose.model("studymaterial",studymaterialSchema)