"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Anuncio = mongoose.model('Anuncio');

router.get('/', function (req, res, next) {
   
    var nombre = req.query.nombre;
    var venta = req.query.venta;
    var precio = req.query.precio;
    var foto = req.query.foto;
    var tags = req.query.tags;

    //Para indicar por que fila empiezo, si no indico ninguna, por defecto empiezo por la 0.
    var start = parseInt(req.query.start) || 0;

    //Limitar el número de registros a mostrar, en este caso por defecto NULL.
    var limit = parseInt(req.query.limit) || null;

    //Orden 1 ó -1, por defecto NULL.
    var sort = req.query.sort || null;

    //Inicializo filters.
    var filters = {};

    if(typeof nombre !== 'undefined'){

        filters.nombre = nombre;

    }

    Anuncio.list(filters, start, limit, sort, function (err, rows) {

        if(err){

            return res.json({success: false, error: err});

        }

        res.json({succces: true, rows: rows});

    });

});

router.post('/', function (req, res, next) {

    var anuncio = new Anuncio(req.body);

    anuncio.save((function (err, saved) {

        if(err){

            //Si error nos vamos al siguiente middleware.
            next(err);
            return;

        }

        res.json({success: true, saved: saved});

    }));

});

module.exports = router;