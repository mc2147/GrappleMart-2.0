const router = require('express').Router()
const {User, Course} = require('../db/models')
const fileUpload = require('express-fileupload');

module.exports = router

router.get('/', (req, res, next) => {
    res.json("test");
})

router.post('/', (req, res, next) => {
    console.log("posting to /uploads: ");
    console.log("req.body: ", req.body);      
    console.log("dirname: ", __dirname);
    // console.log("req: ", req);
    console.log("req.files: ", req.files);

  if (req.files) {
        let file = req.files.file;
        file.mv(__dirname + '/../../public/files/' + file.name, function(err) {
            if (err) {
                console.log(err);
                // return res.status(500).send(err);
            }
            // res.send('File uploaded!');
        })
        // Campus.create(req.body).then((campus) => {
        //     console.log("CAMPUS CREATED: ", campus);
        //     campus.imageUrl = img.name;
        //     campus.save().then((result) => {
        //         console.log("CAMPUS SAVED: ", campus);
        //         res.redirect("/campuses/" + campus.id);
        //     })
        // });
    } 
    res.json({})
})
