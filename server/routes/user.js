const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user') // Importar el userSchema

const { verifyToken, verifyAdminRole } = require('../middlewares/autentication')
const app = express()

app.get('/user', verifyToken, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);



    User.find({ state: true }, 'name email role state')
        .skip(from)
        .limit(limit)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({ state: true }, (err, count) => {

                res.json({
                    ok: true,
                    usuarios,
                    count
                })
            })
        });
})

app.post('/user', [verifyToken, verifyAdminRole], (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })


    })




})

app.put('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['name', 'email', 'adrress', 'city', 'country', 'phone', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

app.delete('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id;

    let changeState = {
        state: false
    }
    User.findOneAndUpdate(id, changeState, { new: true }, (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            })

        }
        res.json({
            ok: true,
            user: userDelete
        })

    })
})

module.exports = app;