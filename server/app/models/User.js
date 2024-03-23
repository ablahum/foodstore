const mongoose = require('mongoose')
const { Schema, model } = mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcrypt')

// user model
const userSchema = Schema(
  {
    user_id: Number,
    name: {
      type: String,
      required: [true, 'Name must be fulfilled'],
    },
    email: {
      type: String,
      required: [true, 'Email must be fulfilled'],
    },
    password: {
      type: String,
      required: [true, 'Password cannot be empty'],
      minlength: [8, 'Minimum password length is 8 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    token: [String],
  },
  { timestamps: true }
)

mongoose.set('strictQuery', true)

// user_id auto increment
userSchema.plugin(AutoIncrement, { inc_field: 'user_id' })

// email validation
userSchema.path('email').validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return EMAIL_RE.test(value)
  },
  (attr) => `${attr.value} not valid`
)

// existing email validation
userSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('User').count({ email: value })
      return !count
    } catch (err) {
      throw err
    }
  },
  (attr) => `${attr.value} already exist`
)

// hash the password
const HASH_ROUND = 10
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = model('User', userSchema)
