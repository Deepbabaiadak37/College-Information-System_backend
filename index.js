const express =  require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const InitiateDb = require('./src/config/db')
const userroutes = require('./src/routes/userrouters')

const PORT = 3001 || process.env.PORT;

var app = express()
InitiateDb()

app.use(bodyparser.json())
app.use(cors())
app.use('/images',express.static('uploads'))
app.use('/profile-images',express.static('profile-uploads'))


 
app.use('/userroutes',userroutes)

if(process.env.NODE_ENV=="production")
{
    app.use(express.static('../frontend/build'))
}

app.listen(PORT,(req,res)=>{
    console.log(`server started at port ${PORT}`)
})