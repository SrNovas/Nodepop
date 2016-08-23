'use strict';

var express = require('express');
var router = express.Router();

var Token = require('mongoose').model('Token');
var Usuario = require('mongoose').model('Usuario');
console.log(Token);
router.get('/', function(req, res) {

    var token = new Token(req.query);
    var usuario = token.usuario || null;
    console.log(token.plataforma);
    console.log(token.token);
    //Función útil para comprobar que los .save posteriores son correctos.
    function saveData(err, saved) {

        if (err) {

            return res.json({ success: false, error: 'Bomba!' });

        }

        res.json({ success: true, saved: saved });

    }

    //Comprobamos que no nos hemos dejado ningún campo requerido sin rellenar.
    var error = token.validateSync();
console.log(token.plataforma);
console.log(token.token);
    if (error) {

        return res.json({ success: false, error: 'Faltan datos obligatorios!'});

    }



    Usuario.findOne({ _id: usuario }, function(err, usuario) {

        if (err || usuario === null) {

            //No existe el usuario!
            return res.json({ success: false, error: 'No existe el usuario!' });

        }

            token.save(saveData);

        });

});

module.exports = router;
