const User = require("../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const registerNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    //if user email already exist, return 403, else create User doc
    if (existingUser) {
      return res.status(403).json({
        msg: "User already exist", check: false
      })
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
      req.body.password = hashPassword
      await User.create(req.body)
      res.json({
        msg: "registered successfully", check: true
      })
    }
  } catch (err) {
    console.log(err)
  }
}


const loginUser = async (req, res) => {

  try {

    const userDetails = await User.findOne({ email: req.body.email })

    if (userDetails) {
      const passwordMatched = await bcrypt.compare(req.body.password, userDetails.password)

      if (passwordMatched) {
        const token = jwt.sign(
          { email: userDetails.email },
          process?.env.SECRET_KEY
        )
        res.json({ msg: 'login successful', check: true, token, userDetails })
      } else {
        res.json({ msg: 'incorrect password', check: false })
      }

    } else {
      res.json({ msg: 'email not found', check: false })
    }
  } catch (err) {
    console.log(err)
    res.json({ msg: 'login failed', check: false })
  }
}


module.exports = { registerNewUser, loginUser}