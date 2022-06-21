const mongoose=require('mongoose');
const attendanceSchema=new mongoose.Schema({
    year: {
        type:String,
        require:true
    },
    coursename:
    {
        type:String,
        require:true
    },
    dept:{
        type:String,
        require:true
    },
    date :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    presentstatus:
    {
        type:String,
        require:true
    },
    absentstatus:
    {
        type:String,
        require:true
    }
})

module.exports = mongoose.model("attendance",attendanceSchema)