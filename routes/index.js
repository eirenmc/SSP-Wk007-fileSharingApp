var express = require('express');
var router = express.Router();
var fs = require('fs');

//Temporary Global vvariable
var files = new Array();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploadFile', function(req,res,next){
   res.render('fileUpload'); 
});

router.post('/uploadFile', function(req,res,next){
  
   
   //One way to create an id for an object
   /*var theFile = {};
   theFile.name = req.files[0].filename
   theFile.id = Date.now();
   files.push(req.files[0].filename);*/
    
   //File has been uploaded
   console.log(req.files[0].filename);
   
   req.files[0]._id = Date.now();
   console.log(req.files[0]);
   files.push(req.files[0]);
   res.redirect('/files');
});

router.get('/files', function(req,res,next){
    res.render('test', {theFiles: files});
});

router.get('/deleteFile/:fileId', function(req,res,next){
   console.log("Just being asked to delete " + req.params.fileId);
   
   for(var i = 0; i < files.length; i++){
       if(files[i]._id == req.params.fileId){
           //We have got a match
           fs.unlink('./uploads/' + files[i].filename, function(error){
            //do nothing   
           });
           files.splice(i,1);
           break;
       }
   }
   
    res.redirect('/files');
});

module.exports = router;
