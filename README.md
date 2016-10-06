# Nodepop

1-. Instalar dependencias de la aplicación con "npm install".

2-. Ejecutar "npm run installDB" para iniciar la base de datos.

3-. Ejecutar "npm run start" para iniciar la aplicación.

#Registro de usuarios (datos mínimos):

- POST http://localhost:3000/api/v1/usuarios/

> nombre -> Nombre del usuario.

> email -> Dirección de correo electrónico.

> clave -> Contraseña del usuario.

{
  "success": true,
  "saved": {
    "__v": 0,
    "nombre": "juan",
    "email": "lll@lll.es",
    "clave": "OMITIDO",
    "_id": "OMITIDO"
  }
}

{
  "success": false,
  "error": "Fallo en datos obligatorios!"
}

#Autenticación de usuarios

- POST http://localhost:3000/api/v1/usuarios/authenticate

> email -> Dirección de correo electrónico.

> clave -> Contraseña del usuario. Parámetro obligatorio.

{
  "success": true,
  "token": "OMITIDO"
}

{
  "success": false,
  "error": "Faltan datos obligatorios"
}

#Anuncios

- GET http://localhost:3000/api/v1/anuncios?precio=0-9999

{
  "succces": true,
  "rows": [
    {
      "_id": "57f687301e18f915eaa13dab",
      "nombre": "Bicicleta",
      "venta": true,
      "precio": 230.15,
      "foto": "/images/bici.jpg",
      "tags": [
        "lifestyle",
        "motor"
      ]
    },
    {
      "_id": "57f687301e18f915eaa13dac",
      "nombre": "iPhone 3GS",
      "venta": false,
      "precio": 50,
      "foto": "/images/iphone.png",
      "tags": [
        "lifestyle",
        "mobile"
      ]
    }
  ]
}



