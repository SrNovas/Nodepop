"use strict";

var mongoose = require('mongoose');

//Creo el esquema.
var anuncioSchema = mongoose.Schema({

    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]

});

//Hacer método estático
anuncioSchema.static.list = function (filter, start, limit, sort, callback) {

    var query = Anuncio.find(filter);

    //Que salte los registros que me diga.
    query.skip(start);

    //Para limitar el número de registros.
    query.limit(start);

    //Ordernar
    query.sort(sort);

    return query.exec(callback);

};//Lo asignamos al modelo, luego, al crear la colección, lo crearemos como 'anuncios'.
var Anuncio = mongoose.model('Anuncio', anuncioSchema);