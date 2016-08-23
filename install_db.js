'use strict';

var mongodb = require('mongodb').MongoClient;
var fs = require('fs');

mongodb.connect('mongodb://localhost:27017/nodepopDB', function(err, db) {

    if (err) {

        process.exit(1);
        return;

    }

    //Borro usuarios.
    db.collection('usuarios').drop();

    //Borro anuncios.
    db.collection('anuncios').drop();

    CargaUsuarios(db).then(CargaAnuncios).then(disconnect).catch(function(err) {

        console.error(err);

    });

});

function CargaUsuarios(db) {

    return new Promise(function(resolve, reject) {

        //Leo mi JSON creado.
        fs.readFile('usuarios.json', function(err, data) {

            if (err) {

                return reject(new Error('Error leyendo el usuarios.json: ', err));

            }

            //Parseo del JSON.
            var fichero = JSON.parse(data);

            //Creamos el Collection de usuarios.
            db.createCollection('usuarios', function(err, collection) {

                if (err) {

                    return reject(new Error('Error creando collection de usuarios: ', err));

                }

                //Inserción de lo parseado anteriormente.
                collection.insert(fichero);

                resolve(db);

            });

        });

    });

};

function CargaAnuncios(db) {

    return new Promise(function(resolve, reject) {

        fs.readFile('anuncios.json', function(err, data) {

            if (err) {

                return reject(new Error('Error leyendo el anuncios.json: ', err));

            }

            var jsonData = JSON.parse(data);

            db.createCollection('anuncios', function(err, collection) {

                if (err) {

                    return reject(new Error('Error creando collection de anuncios: ', err));

                }

                collection.insert(jsonData);

                resolve(db);

            });

        });

    });

}

function disconnect(db) {

    return new Promise(function(resolve, reject) {

        db.close(false, function(err, result) {

            if (err) {

                return reject(new Error('Error desconectando la BD: '), err);

            }

            resolve();

        });

    });

}