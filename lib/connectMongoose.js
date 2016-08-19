"use strict";

var mongoose = require('mongoose');
var conn = mongoose.connection;

//Handler de eventos de conexión.
conn.on('error', debug.bind(console, 'Connection error!'));

conn.once('open', function () {

    debug('Connected to MongoDB!');

});

//Conecto a la BD.
mongoose.connect('mongodb://localhost:27017/nodepopDB')

