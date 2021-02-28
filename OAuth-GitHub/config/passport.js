require('dotenv').config()

const githubOption = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
}

module.exports = { githubOption }
