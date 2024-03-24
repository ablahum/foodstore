const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')

const { getToken } = require('../../utils')
const config = require('../../config')
const { User } = require('../models')

const { secretkey } = config

// passportjs strategy
const localStrategy = async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt -cart_items -token')

    if (!user) return done()

    if (bcrypt.compareSync(password, user.password)) {
      ;({ password, ...userWithoutPassword } = user.toJSON())
      return done(null, userWithoutPassword)
    }
  } catch (err) {
    done(err, null)
  }

  done()
}

const me = (req, res) => {
  const user = req.user

  if (!user) return res.status(400).json({ message: "You're not logged in or token expired" })

  return res.status(200).json(user)
}

const register = async (req, res, next) => {
  const payload = req.body

  try {
    const user = new User(payload)
    await user.save()

    return res.status(201).json({
      message: 'Register successful',
      user,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: err.message,
        details: err.errors,
      })
    }

    next(err)
  }
}

const login = async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err)

    if (!user) return res.status(400).json({ message: 'Email or password is incorrect' })

    // generate token
    const signed = jwt.sign(user, secretkey)

    await User.findByIdAndUpdate(user._id, {
      $push: {
        token: signed,
      },
    })

    return res.status(200).json({
      message: 'Login successful',
      user,
      token: signed,
    })
  })(req, res, next)
}

const logout = async (req, res) => {
  const token = getToken(req)

  // detach token
  const user = await User.findOneAndUpdate(
    {
      token: { $in: [token] },
    },
    {
      $pull: { token: token },
    },
    { useFindAndModify: false }
  )

  if (!token || !user) return res.status(400).json({ message: 'User not found' })

  return res.status(200).json({
    message: 'Logout successful',
    user,
  })
}

module.exports = {
  localStrategy,
  me,
  register,
  login,
  logout,
}
