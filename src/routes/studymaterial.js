const express = require('express')
const router = express.Router()
const multer =  require('multer')
const StudyMaterial = require('../model/studymaterial')



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post('/',upload.single('image'), async(req, res) => {
  
    try {
        var newStudyMaterial = new StudyMaterial({
            date: req.body.date,
            dept: req.body.dept,
            year: req.body.year,
            coursename:req.body.coursename,
            about:req.body.about,
            imageUrl: 'http://localhost:3001/images/' +req.file.originalname,
        })
        await newStudyMaterial.save().then(()=>{
            res.status(200).json({ status:200 })
        })
    }catch(err){
        console.error(err)
        res.status(200).json({msg: err ,status:500})
    }
})


router.post('/getstudymaterials',async(req, res) => {
  
    try {
        const {year,dept} = req.body;
            if(!year || !dept)
            {
                return res.status(422).json({error:"No Details are there to search !!"})
            }
        var chkmaterials = await StudyMaterial.find({ year,dept });
        res.status(200).json(chkmaterials);

    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({})
    }
})
module.exports = router