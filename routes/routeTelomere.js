var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var population = require('../models/Population.js');
var Telomere = require('../models/Telomere');


/* GET ALL Polulation */
router.get('/', function (req, res, next) {

  population.find({}).then(populations => {
    console.log('pop' + populations);
  });



  population.find(function (err, products) {
    if (err) return next(err);
    console.log('products', products);
    res.json(products);
  });
});



/* GET SINGLE Population BY ID */
router.get('/:id', function (req, res, next) {
  population.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Population */
router.post('/population', function (req, res, next) {

  Population.create(req.body, function (err, post) {

    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE sample*/
/*router.post('/sample', function(req, res, next) {
  Telomere.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log('post' , post + post );
    res.json(post);
  });
});*/
router.post('/', function (req, res, next) {
  console.log('dans le post', req);
  var path = '';
  console.log('voici la requête' + req.file.originalname);
  /* upload(req, res, function (err) {
     console.log('dans upload');
      if (err) {
        // An error occurred when uploading
        console.log('dans error ' + err);
        return res.status(422).send("an Error occured");
      }
     // No error occured.
      path = req.file.path;
      console.log('avant send ' + err);
      return res.send("Upload Completed for " + path);
     });  */
});
router.post('/sample/file', (req, res) => {

  new Promise((resolve, reject) => {
    if (req.params.id) {
      console.log(req.params);
      Telomere.findById(req.params.id).then(resolve, reject);
      console.log("avec ID");
    } else {
      resolve(new Telomere());

    }
    res.json("une reponse du serveur    ");
  }).then(telomere => {



    Telomere.find({ "originalename": req.body.originalname }).count().then(how => {
      // console.log("find filenames  " + req.body.fileName + " ? " + how);
      if (how != 0) {
      console.log(" ce fichier existe déjà en base ");
       
      
      }
    });

    telomere.fileName = req.file.filename;
    telomere.originalname = req.file.originalname;
    telomere.organisme = req.body.organisme;
    telomere.nbCells = req.body.nbCells;
    telomere.author = req.body.author;
    telomere.date_edition = req.body.date_edition;
    telomere.protocole = req.body.protocole;


    return telomere.save();

  }),err => console.log(err);
});
router.post('/sample/:id?', (req, res) => {

  new Promise((resolve, reject) => {
    if (req.params.id) {
      console.log(req.params);
      Telomere.findById(req.params.id).then(resolve, reject);
      console.log("avec ID");
    } else {
      resolve(new Telomere());

    }

  }).then(telomere => {



    Telomere.find({ "name": req.body.fileName }).count().then(how => {
      // console.log("find filenames  " + req.body.fileName + " ? " + how);
      if (how != 0) {
        console.log(" exist \n");
        res.redirect('/exist');
      }
    });
    telomere.fileName = req.file.fileName;
    telomere.originalname = req.body.originalname;
    telomere.organisme = req.body.organisme;
    telomere.nbCells = req.body.nbCells;
    telomere.author = req.body.author;
    telomere.date_edition = req.body.date_edition;
    telomere.protocole = req.body.protocole;

    return telomere.save();

  }).then((post) => {

    res.json(post);
  }), err => console.log(err);
});
/* UPDATE population */
router.put('/:id', function (req, res, next) {
  Population.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE population */
router.delete('/:id', function (req, res, next) {
  Population.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;