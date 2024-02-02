const express= require('express')
const router= express.Router()
const {hello}= require('../controllers/users')

router.get('/', hello)

module.exports= router