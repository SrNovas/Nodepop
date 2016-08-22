"use strict";

//A principio uso HASH256, pero está deprecada la librería, así que la quito del JSON y uso esta.
var hash = require('hash.js');
var jwt= require('jsonwebtoken');
var config = require('../../../local_config');

var express = require('express');
var router = express.Router();

var Usuario = require('mongoose').model('Usuario');

router.post('/', function (req, res) {

    var usuario = new Usuario(req.body);

    //Comprobamos que los campos obligatorios tienen la correspondiente información.
    var errores = usuario.validateSync();

    if(errores){

        return res.json({success: false, error: 'Fallo en datos obligatorios!'})

    }

    //Al lío con la encriptación
    var chorizo = hash.sha256().update(usuario.clave).digest('hex');

    usuario.clave = chorizo;

    usuario.save(function (err, saved) {

        if(err){

            return res.json({success: false, error: 'Cagada!'});

        }

        res.json({success: true, saved: saved});

    });

});

router.post('/authenticate', function(req, res) {

    var email = req.body.email || null;
    var pass = req.body.clave || null;

    if (email === null || pass === null) {

        return res.json({ success: false, error: 'Faltan datos obligatorios' });

    }

    Usuario.findOne({ email: email }, function(err, usuario) {

        if (err) {

            return res.status(401).json({ success: false, error: err });

        }

        if (!usuario) {

            return res.status(401).json({ success: false, error: 'Auth failed. User not found' });

        }

        //Comparamos las cadenas
        if(hash.sha256().update(pass).digest('hex') === usuario.clave){

            var token = jwt.sign({ id:usuario._id }, config.jwt.secret, {

                expiresIn: '2 days'

            });

            res.json({ success: true, token: token });

        } else {

            res.status(401).json({ success: false, error: 'Auth failed. Invalid password!' });

        }

    });

});

module.exports = router;