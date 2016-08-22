'use strict';

var mongoose = require('mongoose');

//Exigiremos un nombre y email.
var usuarioSchema = mongoose.Schema({

    nombre: {

        type: String,
        required: true //Requerimos el nombre como obligatorio.

    },
    email: {

        type: String,
        required: true, //Requerimos el correo como obligatorio.
        index: true

    },
    clave: {

        type: String,
        required: true

    }
});

var Usuario = mongoose.model('Usuario', usuarioSchema);