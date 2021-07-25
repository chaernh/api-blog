const passport = require('passport')

exports.auth = passport.authenticate('jwt', { session: false })
exports.JWT_SECRET = 's4tr14b4t4n9h1t4m'