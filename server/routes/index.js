const express = require('express')
const app = express()


app.use(require('./user')) //Importar ruta usuario
app.use(require('./login')) //Importar ruta usuario



module.exports = app;