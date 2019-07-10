require('./config/config'); //incluir configuración global

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user')) //Importar ruta usuario


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;

    console.log('Bases de datos on line');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ', process.env.PORT);
})