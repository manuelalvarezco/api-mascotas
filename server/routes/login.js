const express = require('express')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../models/user') // Importar el userSchema
const app = express()

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'User or password incorrect!'
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'User or password incorrect!'
            })
        }

        let token = jwt.sign({ user: userDB },
            process.env.SEED, { expiresIn: process.env.EXPIRATION }
        )

        res.json({
            ok: true,
            user: userDB,
            token
        })


    })

})






module.exports = app;