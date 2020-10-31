const GithubStrategy = require('passport-github').Strategy
const passport = require('passport')
const { githubOption } = require('../config/passport')
const User = require('../models').User

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user)
    })

    const githubVerify = async (accessToken, refreshToken, profile, done) => {
        const { _json: { id, avatar_url }} = profile
    
        try {
            User.findOrCreate({
                where: {
                    user_id: profile.username,
                    type: 'github'
                }
            })
            User.update({
                photo: avatar_url 
                },{
                where: {
                    user_id: profile.username,
                    type: 'github'
                }
            })
            .then(user => { 
                if (!user) return done(err, user)
                return done(null, user[0])
            })

        } catch (err) {
            return done(err)
        }
    }

    passport.use(new GithubStrategy(githubOption, githubVerify))    
}
