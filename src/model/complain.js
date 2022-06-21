const mongoose=require('mongoose');
const complainSchema=new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    roomno :{
        type:String,
        require:true
    },
    details:{
        type:String,
        require:true
    },
    complainstate:
    {
        type:Boolean,
        require:true
    }

})

module.exports = mongoose.model("complain",complainSchema)