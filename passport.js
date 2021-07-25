const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const UserCtrl = require('./routes/api/users/users.controller')
const Users = require('./routes/api/users/users.scheme')

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((obj, done) => {
    done(null, obj);
})

passport.use(new BasicStrategy((username, passwd, done)=>{
    UserCtrl.login(username, passwd).then(user => {
        return done(null, user, { message : 'Logged In Successfully'})
    }).catch(err=>{
        return done(err, null)
    })
}))

module.exports = passport