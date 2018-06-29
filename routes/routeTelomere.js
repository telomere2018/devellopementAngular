var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Population = require('../models/Population');
var Telomere = require('../models/Telomere');

/* GET ALL Polulation */
router.get('/', function(req, res, next) {
  Population.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Population BY ID */
router.get('/:id', function(req, res, next) {
  Population.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Population */
router.post('/', function(req, res, next) {
  Population.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE population */
router.put('/:id', function(req, res, next) {
  Population.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Population.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;