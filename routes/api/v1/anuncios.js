"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Anuncio = mongoose.model('Anuncio');

router.get('/', function (req, res, next) {
   
    var nombre = req.query.nombre;
    var venta = req.query.venta;
    var precio = req.query.precio || null;
    var foto = req.query.foto;
    var tags = req.query.tags || null;

    //Para indicar por que fila empiezo, si no indico ninguna, por defecto empiezo por la 0.
    var start = parseInt(req.query.start) || 0;

    //Limitar el número de registros a mostrar, en este caso por defecto NULL.
    var limit = parseInt(req.query.limit) || null;

    //Orden 1 ó -1, por defecto NULL.
    var sort = req.query.sort || null;

    //Inicializo criteria (filtros).
    var criteria = {};

    if(typeof nombre !== 'undefined'){

        //Búsqueda por expresión regular.
        criteria.nombre = new RegExp('^' + req.query.nombre, 'i');

    }

    if(typeof venta !== 'undefined'){

        //Venta, string.
        criteria.venta = req.query.venta;

    }

    //PETA CUANDO SOLO LLAMO A ANUNCIOS EL INDEXOF
    if(typeof precio !== null){

        //50 buscará los que tengan precio igual a 50  {precio:'50'}
        //Si no lo encuentra, devuelve -1.
        if(precio.indexOf('-') !== -1) {

            //Separo si me viene con guión (10­50), ojo split me transforma los Number a String.
            var precio_split = precio.split('-');
            var precio_iz = parseInt(precio_split[0]) || 0;
            var precio_der = parseInt(precio_split[1]) || 0;

            //­50 buscará los que tengan precio menor de 50  {precio:{'$lte': '50' } }
            if (precio_iz === 0) {

                criteria.precio = {$lte: precio_der};

                //10­ buscará los que tengan precio mayor que 10  {precio:{'$gte': '10' } }
            } else if (precio_der === 0) {

                criteria.precio = {$gte: precio_iz};

                //10­50 buscará anuncios con precio incluido entre estos valores  {precio: { '$gte': '10', '$lte': '50' } }
            } else {

                criteria.precio = {$gte: precio_iz, $lte: precio_der};

            }

        }else{

            criteria.precio = req.query.precio;

        }

    }

    if(tags !== null){

        //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray
        if (Array.isArray(tags)) {

            filters.tag = {$in: tags};

        } else {

            //Tan sólo un elemento.
            filters.tag = tags;

        }

    }

    Anuncio.list(criteria, start, limit, sort, function (err, rows) {

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