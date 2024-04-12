const {addNewProjects, getAllProjects} = require('../controllers/projects')
const express= require('express')

const router= express.Router()
router.post('/projects', addNewProjects)
router.get('/projects', getAllProjects)
module.exports= router