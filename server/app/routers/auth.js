const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { localStrategy, me, register, login, logout } = require('../controllers/AuthControllers')

passport.use(new LocalStrategy({ usernameField: 'email' }, localStrategy))

router.get('/me', me)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
