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


const changePassword= async(req, res)=>{
  try{
    //fetching all the details of user by id
    const userById = await User.findById(req.body.id )
   
    //error showing while id not found in database
    if (!userById) {
        return res.json({ msg: 'No user found', check:false })
    }

        //if id is found then, input currentPassword is matched with the password in database
        const passwordMatch = await bcrypt.compare(req.body.currentPassword, userById.password)

            //if password is matched then, our newPassword will encrypt at first and then will replaced with the database password
    if (passwordMatch) {
      const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
      userById.password = hashPassword
      await userById.save();

      res.json({ msg: "password changed successfully", check:true })
    } else {
      res.json({ msg: "wrong current password", check:false })
    }
  }catch(err){
    console.log(err)
  }
}

const getAllUsers= async(req, res)=>{
  try{
    if(!req.query.page){
      const userList= await User.find().select('fullName email')
      res.status(200).json({userList, msg:'All Users fetched successfully'})
    }
      const count= await User.find().count()
      const skipCount=(req.query.page-1)*5
      const userList= await User.find().limit(5).skip(skipCount)
      res.status(200).json({userList, count, msg:'All Users fetched successfully'})
  }catch(err){
    console.log(err)
  }
}


module.exports = { registerNewUser, loginUser, changePassword, getAllUsers}