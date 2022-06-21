const express =  require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const InitiateDb = require('./src/config/db')
const userroutes = require('./src/routes/userrouters')

const hostname=process.env.HOST;
const port = process.env.PORT;

var app = express()
InitiateDb()

app.use(bodyparser.json())
app.use(cors())
app.use('/images',express.static('uploads'))
app.use('/profile-images',express.static('profile-uploads'))


 
app.use('/userroutes',userroutes)


app.listen(port,hostname,(req,res)=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})