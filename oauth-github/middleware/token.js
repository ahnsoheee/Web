require('dotenv').config()
const User = require('../models').User
const SECRET_KEY = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const createToken = (req, res) => {
    const token = jwt.sign({ id: req.user.id }, SECRET_KEY)
    res.cookie('token', token, { httpOnly: true })
    res.redirect('/')
}

const verifyToken = (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = User.findOne({ 
        where: { user_id: decoded.id }
    }) 

    if(user) res.status(200).json({ result: true, user: user })
    return res.status(404).json({ result: false, message: '잘못된 접근입니다.'})
}

module.exports = { createToken, verifyToken }