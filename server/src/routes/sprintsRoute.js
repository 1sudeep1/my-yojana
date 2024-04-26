const {addNewSprints} = require('../controllers/sprints')
const express= require('express')

const router= express.Router()
router.post('/sprints', addNewSprints)
module.exports= router