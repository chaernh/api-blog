const express = require('express')
const passport = require('../../passport')
const router = express.Router()
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../secret')

var debug = require('debug')('project:auth')

// router.get('/login', passport.authenticate('basic', { failureRedirect:'/login' }), (req, res, next)=>{
//     const user = req.user
//     res.json({ currentUser: user })
// })

router.post('/login', passport.authenticate('basic', { failureRedirect:'/login' }), (req, res, next)=>{
    const user = req.user
    user.expireAt = moment().add(12,'h');
    // debug(user);
    const token = jwt.sign(user.toJSON(), JWT_SECRET,  { expiresIn: '12h'})
    res.json({ user, token });
})


router.get('/logout', (req, res, next)=>{
    Promise.all([req.logout(), res.clearCookie('connect.sid')])
    .then(() => {
        res.json({ message: 'Logged out!' })
    }, err => next(err))
})

module.exports = router