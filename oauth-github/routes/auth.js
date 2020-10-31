const express = require('express')
const passport = require('passport')
const tokenMiddleware = require('../../middleware/token')
const router = express.Router()

router.get('/github', passport.authenticate('github'))
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    tokenMiddleware.createToken
)

module.exports = router