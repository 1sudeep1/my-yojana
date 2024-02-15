const User = require("../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const registerNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    //if user email already exist, return 403, else create User doc
    if (existingUser) {
      return res.status(403).json({
        msg: "User already exist"
      })
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
      req.body.password = hashPassword
      await User.create(req.body)
      res.json({
        msg: "registered successfully"
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

      if(passwordMatched){
          res.json({msg: 'login successfull'})
      }else{
        res.json({msg:'incorrect password'})
      }

    }else{
      res.json({msg:'email not found'})
    }
  } catch (err) {
    console.log(err)
    res.json({msg:'login failed'})
  }
}

module.exports = { registerNewUser, loginUser }