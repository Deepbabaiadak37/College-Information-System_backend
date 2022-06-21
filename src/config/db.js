require('dotenv').config()
const mongoose = require('mongoose')


const MONGOURI = "mongodb+srv://deep:deep3737@cluster0.ollr9.mongodb.net/?retryWrites=true&w=majority"

const InitiateDb = async () => {
    try{
        await mongoose.connect(MONGOURI,{
            useUnifiedTopology : true,
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        console.log('database connected')
    }catch(e){
        console.log(e)
    }
}

module.exports = InitiateDb