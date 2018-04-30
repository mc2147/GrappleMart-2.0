const router = require('express').Router()
const {User, Course, Product} = require('../db/models')
const fileUpload = require('express-fileupload');

module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
      where: {}
  })
    .then(products => res.json(products))
    .catch(next)
})

// Inputs: product title, product file, product description, product tags
router.post('/', (req, res, next) => {
    console.log("post products req: ", req);
    // return res.json("done");
    let productFile = req.files.productFile;
    productFile.mv(__dirname + '/../../public/files/' + productFile.name, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    Product.create(req.body).then(product => {
        product.fileURL = productFile.name;
        product.save().then(product => {
            res.json(product);
            // res.redirect(`/products/${product.id}`);
        })
        })
    })
})    

router.get('/test-download', function(req, res) {
    var file = (__dirname + '/../../public/files/' + 'CC_FacePulls.mp4');
     res.download(file) 
 }); 

router.get('/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id:req.params.id,
        }
    })
      .then(product => res.json(product))
      .catch(next)
})

router.get('/:id/download', (req, res, next) => {
    Product.findOne({
        where: {
            id:req.params.id,
        }
    })
      .then(product => {          
           var file = (__dirname + '/../../public/files/' + product.fileURL);
            console.log("product found: " + file);
            res.download(file);
        })
      .catch(next)
  })

  
//     console.log("posting to /api/courses/: ");
//     console.log("req.body: ", req.body);      
//     console.log("dirname: ", __dirname);
//     // console.log("req: ", req);
//     console.log("req.files: ", req.files);
//     // for (var [key, value] of req.body.data.entries()) { 
//     //     console.log(key, value);
//     //   }        
//   if (req.files) {
//         let file = req.files.videoFile;
//         file.mv(__dirname + '/../../public/files/' + file.name, function(err) {
//             if (err) {
//                 console.log(err);
//                 // return res.status(500).send(err);
//             }
//             // res.send('File uploaded!');
//         })
//         // Campus.create(req.body).then((campus) => {
//         //     console.log("CAMPUS CREATED: ", campus);
//         //     campus.imageUrl = img.name;
//         //     campus.save().then((result) => {
//         //         console.log("CAMPUS SAVED: ", campus);
//         //         res.redirect("/campuses/" + campus.id);
//         //     })
//         // });
//     } 
//     res.json({})
// })
